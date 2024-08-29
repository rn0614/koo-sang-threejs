"use client";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import styles from "./styles.module.scss";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import HambuggerButton from "../HambuggerButton/HambuggerButton";
import { BsJustify } from "react-icons/bs";
import { Box } from "@radix-ui/themes";
import Sidebar from "../Sidebar/Sidebar";

type HeaderProps = {
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const scrollDirection = useScrollDirection();
  const authModal = useAuthModal();
  const router = useRouter();
  const [sidbarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname, searchParams]);

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };
  return (
    <header
      className={`${styles.headerWrapper} ${
        scrollDirection === "down" && styles.headerHidden
      }`}
    >
      <Box className={styles.buttonWrapper}>
        <Box className={styles.sidebarButton}>
          <BsJustify
            size={32}
            color="black"
            onClick={() => setSidebarOpen((pre) => !pre)}
          />
        </Box>
        <Link href={"/music"}>
          <FaHome size={32} color="black" />
        </Link>
        <Link href={"/music/search"}>
          <CiSearch size={32} color="black" />
        </Link>
      </Box>
      {user ? (
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
            onClick={authModal.onOpen}
            size={32}
            style={{ cursor: "pointer" }}
          />
        </Box>
      )}
      <Sidebar isOpen={sidbarOpen} scrollDirection={scrollDirection}/>
    </header>
  );
};
