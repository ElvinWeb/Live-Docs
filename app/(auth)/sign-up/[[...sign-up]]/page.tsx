import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function SignInPage() {
  return (
    <main className="auth-page">
      <SignUp />
    </main>
  );
}
