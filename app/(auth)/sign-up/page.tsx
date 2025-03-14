"use client";

import React, { useState } from "react";
import { signUpSchema } from "@/lib/zod-validation-schemas";
import { useRouter } from "next/navigation";
import { z } from "zod";
import AuthForm from "@/components/Forms/AuthForm";
import { api } from "@/lib/api";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...formData } = data;
      const res = await api.auth.registor(formData);
      if (res.success) {
        toast.success("Registration Successful!");
      } else {
        toast.error(`${res.message}`, { ariaLabel: "Registration Failed!" });
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
