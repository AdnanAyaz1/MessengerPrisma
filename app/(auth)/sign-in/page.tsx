"use client";

import React, { useState } from "react";
import { signInSchema } from "@/lib/zod-validation-schemas";
import { useRouter } from "next/navigation";
import { z } from "zod";
import AuthForm from "@/components/Forms/AuthForm";
import { api } from "@/lib/api";
import { toast } from "react-toastify";

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    try {
      const res = await api.auth.log_in(data);
      if (res.success) {
        toast.success("Login Successfull");
      } else {
        toast.error(`${res.message}`);
      }
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      type="Sign In"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default SignInPage;
