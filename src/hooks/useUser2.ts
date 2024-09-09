"use client"
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { useRecoilState } from "recoil";
import { userState } from "@/store/useUserStore";

const initialUser ={
  id:"",
  full_name:"",
  avatar_url:"",
  billing_address:"",
  payment_method:""
} 

export default function useUser() {
  const [user1, setUser] = useRecoilState(userState);
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.session.user.id).single();
        setUser(user);
        return user;
      }else{
        return initialUser;
      }
    },
    staleTime:2000000
  });
}
