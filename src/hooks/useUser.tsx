import { Subscription, userDetails } from "@/types/types";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: userDetails | null;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export type Props = {
  [propName: string]: any;
};

export const MyUserContextProvider = (props: Props) => {
  const supabase = createClient();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<userDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [user, setUser]= useState<User|null>(null);
  const [accessToken, setAccessToken]= useState<string|null>(null);

  const getUserDetail = () => supabase.from("users").select("*").single();
  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  useEffect(() => {
    // 세션 정보를 가져오기
    const fetchUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching user session:", error.message);
      } else {
        setUser(session?.user || null);
        setAccessToken(session?.access_token||null);
      }
    };
    fetchUser();

    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetail(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as userDetails);
          }

          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }

          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user]);

  const value = {
    accessToken,
    user,
    userDetails,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUser");
  }
  return context;
};
