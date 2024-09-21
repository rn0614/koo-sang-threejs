"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

/**로그인 로직*/
export async function login(formData: FormData) {
  const supabase = createClient();

  const inputData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // 로그인만 하고 user에는 따로 저장로직 없음. (서버라 애초에 저장못함)
  const { error } = await supabase.auth.signInWithPassword(inputData);

  if (error) {
    redirect("/");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

/** 회원가입 로직*/
export async function signup(formData: FormData) {
  const supabase = createClient();

  const inputData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signUp(inputData);

  console.log(data);
  console.log(error);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
