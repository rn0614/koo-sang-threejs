"use client";
import { login, signup } from "@/app/(header)/login/actions";
import styles from "./styles.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button className={styles.loginButton} formAction={login}>
          Log in
        </button>
        <button className={styles.signupButton} formAction={signup}>
          Sign up
        </button>
      </form>
    </div>
  );
}
