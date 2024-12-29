"use client"; // 클라이언트 전용으로 설정
import { userState } from "@/store/useUserStore";
import queryClient from "@/utils/react-query/queryClient";
import { createClient } from "@/utils/supabase/client";
import { Box } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useRecoilState } from "recoil";
import styles from "./styles.module.scss";
import { stackRouterPush } from "@/utils/stackRouter";
import useUser from "@/hooks/useUser2";
export const initialUser = {
  id: "",
  full_name: "",
  avatar_url: "",
  billing_address: "",
  payment_method: "",
};

const HeaderButton = () => {
  console.log('header button rendering')
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const {user,logOut, refetch} = useUser();
  const supabaseClient = createClient();
  const client = queryClient();

  const handleLogout = async () => {
    client.invalidateQueries(["user"]);
    const { error } = await supabaseClient.auth.signOut();
    console.log('logout,',error)
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
      await logOut();
    }
  };
  const loginButtonHandler = () => {
    stackRouterPush(router, `/home/login`);
  };

  const userProfileHandler = async () => {
    const user = await supabaseClient.auth.getUser();
    router.push(`/user/${user.data.user?.email}`);
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
      {user!==null && (
        <Box className={styles.buttonWrapper}>
          <BiLogOut
            onClick={handleLogout}
            size={32}
            style={{ cursor: "pointer" }}
          />
          <CgProfile
            onClick={() => userProfileHandler()}
            size={32}
            style={{ cursor: "pointer" }}
          />
        </Box>
      )}
      {user===null && (
        <Box className={styles.buttonWrapper}>
          <BiLogIn
            onClick={loginButtonHandler}
            size={32}
            style={{ cursor: "pointer" }}
          />
        </Box>
      )}
    </>
  );
};

export default React.memo(HeaderButton);
