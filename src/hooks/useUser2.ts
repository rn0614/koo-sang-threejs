import { userState } from "@/store/useUserStore";
import queryClient from "@/utils/react-query/queryClient";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";


const fetchUser = async () => {
  const supabase = createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (sessionError) {
    throw new Error(`Session error: ${sessionError.message}`);
  }

  const userId = sessionData.session?.user?.id;
  if (!userId) {
    return null;
  }

  // const { data: user, error: userError } = await supabase
  //   .from("users")
  //   .select("*")
  //   .eq("id", userId)
  //   .single();

  if (userError) {
    throw new Error(`User fetch error: ${userError.message}`);
  }

  return user || null;
};

export default function useUser() {
  const client = queryClient();
  const [user, setUser] = useRecoilState(userState);
  // React Query로 사용자 상태 관리
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 0, // 1시간 동안 데이터가 fresh 상태로 유지됨
    cacheTime: 0, // 1시간 동안 캐시된 데이터를 유지함
    retry: false, // 에러가 발생하면 자동으로 재시도하지 않음
    onSuccess: (data) => {
      setUser(data as any);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
  const logOut = async () => {
    console.log("logut run");
    await client.invalidateQueries(["user"]);
    setUser(null);
    await refetch();
  };

  return { user: user, logOut, isLoading, isFetching, isError, error, refetch };
}
