"use client"; // 클라이언트 전용으로 설정

import useUser from "@/hooks/useUser2";
import { initialUser, userState } from "@/store/useUserStore";
import { createClient } from "@/utils/supabase/client";
import { Box } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useRecoilState } from "recoil";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

export default function HeaderButton() {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const supabaseClient = createClient(); // 클라이언트에서만 동작
  
  const [user,setUser] = useRecoilState(userState);
  // 로그아웃 처리 함수
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    setUser(initialUser);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };
  useEffect(()=>{
    setLoading(false);
  },[])

  if(isLoading){
    return null
  }

  // 데이터가 있으면 로그인 상태, 없으면 로그인 버튼 표시
  return (
    <>
      {user.id!=="" ? (
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
      ) : (
        <Box className={styles.buttonWrapper}>
          <BiLogIn
            onClick={()=>router.push("/login")}
            size={32}
            style={{ cursor: "pointer" }}
          />
        </Box>
      )}
    </>
  );
}
