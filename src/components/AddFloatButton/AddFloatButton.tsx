"use client";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { CiCirclePlus } from "react-icons/ci";
import useUploadModal from "@/hooks/useUploadModal";
import useUser from "@/hooks/useUser2";
import useAuthModal from "@/hooks/useAuthModal";

export const AddFloatButton = () => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user, isLoading } = useUser();
  const onClick = () => {
    if (!user.id) {
      return authModal.onOpen();
    }
    return uploadModal.onOpen();
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className={styles.floatingButton} onClick={onClick}>
      <CiCirclePlus size={32} color={"white"}></CiCirclePlus>
    </div>
  );
};
