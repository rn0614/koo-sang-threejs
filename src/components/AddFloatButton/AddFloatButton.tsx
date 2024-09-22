"use client";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { CiCirclePlus } from "react-icons/ci";
import useUploadModal from "@/hooks/useUploadModal";
import useAuthModal from "@/hooks/useAuthModal";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/useUserStore";

export const AddFloatButton = () => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const user = useRecoilValue(userState);
  const onClick = () => {
    if (!user.id) {
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
