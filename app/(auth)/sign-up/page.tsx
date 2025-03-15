"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import AuthForm from "@/components/Forms/AuthForm";
import { api } from "@/lib/api";
import { signUpSchema } from "@/lib/zod-validation-schemas";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    try {
      const res = await api.auth.registor(data);
      if (res.success) {
        toast.success("Registration Successful!");
        router.push("/");
      } else {
        toast.error(`${res.message}`);
      }
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
      defaultValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default SignUpPage;
