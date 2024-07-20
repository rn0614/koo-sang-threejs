"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import styles from "./styles.module.scss";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import Button from "../Button/Button";
import toast from "react-hot-toast";

type HeaderProps = {
  children: ReactNode;
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    // TODO: Reset any playing song
    router.refresh();

    if (error) {
      toast.error(error.message)
    }else{
      toast.success('Logged out!')
    }
  };
  return (
    <header className={styles.HeaderWrapper}>
      <div>
        <button>Home</button>
        <button>Searce</button>
      </div>
      {user ? (
        <div>
          <Button onClick={handleLogout}>Logout</Button>
          <Button onClick={() => router.push("/account")}>프로필</Button>
        </div>
      ) : (
        <div>
          <Button onClick={authModal.onOpen}>Sign Up</Button>
          <Button onClick={authModal.onOpen}>Log In</Button>
        </div>
      )}
    </header>
  );
};
