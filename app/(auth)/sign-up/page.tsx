"use client";

import React, { useState } from "react";
import { signUpSchema } from "@/lib/zod-validation-schemas";
import { useRouter } from "next/navigation";
import { z } from "zod";
import AuthForm from "@/components/Forms/AuthForm";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    try {
      console.log("Sign Up Data:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      type="Sign Up"
      schema={signUpSchema}
      defaultValues={{ username: "", email: "", password: "" }}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default SignUpPage;
