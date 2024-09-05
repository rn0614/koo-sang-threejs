import readUserSession from "@/actions/getUserSession";
import AuthForm from "@/components/AuthForm/AuthForm";
import { redirect } from "next/navigation";


export default async function LoginPage() {
  const {data} = await readUserSession();

  console.log(data.session?.user.email);
  return (
    <AuthForm/>
  );
}
