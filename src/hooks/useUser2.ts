import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const initialUser = {
  id: "",
  full_name: "",
  avatar_url: "",
  billing_address: "",
  payment_method: ""
};

const supabaseClient = createClient();

const fetchUser = async () => {
  const supabase = createClient();
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError) {
    throw new Error(`Session error: ${sessionError.message}`);
  }

  const userId = sessionData.session?.user?.id;
  if (!userId) {
    return initialUser;
  }

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  console.log('fetch user',user)
  if (userError) {
    throw new Error(`User fetch error: ${userError.message}`);
  }

  return user || initialUser;
};

export default function useUser() {
  const router = useRouter();

  // React Query로 사용자 상태 관리
  const { data: user, isLoading,isFetching, isError, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 60 * 60 * 1000, // 1시간 동안 데이터가 fresh 상태로 유지됨
    cacheTime: 60 * 60 * 1000, // 1시간 동안 캐시된 데이터를 유지함
    retry: false, // 에러가 발생하면 자동으로 재시도하지 않음
    onError: (error: any) => {
      console.log(error)
    },
  });

  // 로그아웃 함수
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
      refetch(); // 로그아웃 후 사용자를 다시 가져오도록 강제 refetch
    }
  };

  return { user, isLoading, isFetching, isError, error, handleLogout };
}
