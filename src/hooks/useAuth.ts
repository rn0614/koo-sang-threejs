import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/utils/stackRouter";

// Custom Hook
export function useAuth() {
  const router = useRouter();
  const supabase = createClient();

  const loginMutation = useMutation(
    async (formData: FormData) => {
      const inputData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const { error } = await supabase.auth.signInWithPassword(inputData);

      if (error) {
        throw new Error(error.message || "Login failed.");
      }

      return null;
    },
    {
      onSuccess: () => {
        toast.success("Logged in successfully!");
        stackRouterPush(router, "/");
      },
      onError: (error: any) => {
        toast.error(error.message || "Login failed. Please try again.");
      },
    }
  );

  const signupMutation = useMutation(
    async (formData: FormData) => {
      const inputData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      console.log('inputData',inputData);

      const { data, error } = await supabase.auth.signUp(inputData);
      console.log('data',data)
      console.log('error',error)

      if (error) {
        throw new Error(error.message || "Signup failed.");
      }
      return null;
    },
    {
      onSuccess: () => {
        toast.success("가입됐습니다. 가입한 이메일에서 확인을 눌러주세요!",{duration:1000});
        //stackRouterPush(router, "/");
      },
      onError: (error: any) => {
        toast.error(error.message || "Signup failed. Please try again.");
      },
    }
  );

  return { loginMutation, signupMutation };
}
