"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { loginMutation, signupMutation } = useAuth();
  const [submitAction, setSubmitAction] = useState<"login" | "signup">("login");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (submitAction === "login") {
      loginMutation.mutate(formData);
    } else if (submitAction === "signup") {
      signupMutation.mutate(formData);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Welcome Back!</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button
          id="loginBtn"
          className={styles.loginButton}
          type="submit"
          onClick={() => setSubmitAction("login")}
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? "Logging in..." : "Log in"}
        </button>
        <button
          id="signUpBtn"
          className={styles.signupButton}
          type="submit"
          onClick={() => setSubmitAction("signup")}
          disabled={signupMutation.isLoading}
        >
          {signupMutation.isLoading ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}
