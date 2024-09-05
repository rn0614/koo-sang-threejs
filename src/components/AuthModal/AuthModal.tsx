"use client"
import Modal from "../Modal/Modal";
import { createClient } from "@/utils/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";

export const AuthModal = () => {
  const supabaseClient = createClient();
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal title="Wellcom" description="login" isOpen={isOpen} onChange={onChange}>
      <Auth
        magicLink
        supabaseClient={supabaseClient}
        providers={["github"]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: { colors: { brand: "#404040", brandAccent: "#22c55e" } },
          },
        }}
      ></Auth>
    </Modal>
  );
};
