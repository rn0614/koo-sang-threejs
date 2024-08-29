"use client"
import React from "react";
import styles from "./styles.module.scss";
import { CiCirclePlus } from "react-icons/ci";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

export const AddFloatButton = () => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    return uploadModal.onOpen();
  };
  return (
    <div className={styles.floatingButton} onClick={onClick}>
      <CiCirclePlus size={32} color={"white"}></CiCirclePlus>
    </div>
  );
};
