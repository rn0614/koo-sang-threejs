"use client";
import Modal from "@/components/Modal/Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function ModalPage({params}: {params:{id:string}}) {
  const [modalOpen, setModalOpen] = useState(true);
  const router =useRouter();
  const closeHandler =()=>{
    router.back();
  }
  return (
    <Modal isOpen={true} title="modal" description="modal" onChange={() => closeHandler()}>
      <div>modal {`${params.id}`}</div>
    </Modal>
  );
}
