"use client";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { BsJustify } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import styles from "./styles.module.scss";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";

type HeaderProps = {
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const scrollDirection = useScrollDirection();
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    // TODO: Reset any playing song
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };
  return (
    <header className={`${styles.headerWrapper} ${scrollDirection==='down'&&styles.headerHidden}`}>
      <div className={styles.buttonWrapper}>
        <div className={styles.category}>
          <BsJustify size={32} />
        </div>
        <Link href={"/music"}>
          <FaHome size={32} color="black"></FaHome>
        </Link>
        <CiSearch onClick={() => router.push("/music/search")} size={32}>
          Search
        </CiSearch>
      </div>
      {user ? (
        <div className={styles.buttonWrapper}>
          <BiLogOut onClick={handleLogout} size={32}></BiLogOut>
          <CgProfile
            onClick={() => router.push("/account")}
            size={32}
          ></CgProfile>
        </div>
      ) : (
        <div className={styles.buttonWrapper}>
          <BiLogIn onClick={authModal.onOpen} size={32}>
            Log In
          </BiLogIn>
        </div>
      )}
    </header>
  );
};
