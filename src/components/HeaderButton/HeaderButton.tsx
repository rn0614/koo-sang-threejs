"use client"; // 클라이언트 전용으로 설정
import { Box } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/store/useUserStore";
import queryClient from "@/utils/react-query/queryClient";
export const initialUser = {
  id: "",
  full_name: "",
  avatar_url: "",
  billing_address: "",
  payment_method: "",
};

export default function HeaderButton() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const supabaseClient = createClient();

  const handleLogout = async () => {
    const client = queryClient();
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
      client.invalidateQueries(["user"])
      setUser(initialUser);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // 데이터가 있으면 로그인 상태, 없으면 로그인 버튼 표시
  return (
    <>
      {user?.id !== "" && (
        <Box className={styles.buttonWrapper}>
          <BiLogOut
            onClick={handleLogout}
            size={32}
            style={{ cursor: "pointer" }}
          />
          <CgProfile
            onClick={() => router.push("/account")}
            size={32}
            style={{ cursor: "pointer" }}
          />
        </Box>
      )}
      {user?.id == "" && (
        <Box className={styles.buttonWrapper}>
          <BiLogIn
            onClick={() => router.push("/login")}
            size={32}
            style={{ cursor: "pointer" }}
          />
        </Box>
      )}
    </>
  );
}
