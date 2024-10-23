"use client";
import Drawer from "@/components/Drawer/Drawer";
import { UploadModal } from "@/components/UploadModal/UploadModal";

const ModalProvider = () => {
  return (
    <>
      {/* <AuthModal />*/}
      <UploadModal /> 
      <Drawer/>
    </>
  );
};

export default ModalProvider;
