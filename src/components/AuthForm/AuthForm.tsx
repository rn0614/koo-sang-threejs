"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function AuthForm() {
  const [data, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const login = async () => {
    try {
      let { data:dataUser, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.email,
      });
      
      if(dataUser){
        router.refresh();
      }
    } catch (error) {}
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="grid">
        <label>email</label>
        <input
          type="email"
          name="email"
          value={data?.email}
          onChange={handleChange}
        />
      </div>
      <div className="grid">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={data?.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}