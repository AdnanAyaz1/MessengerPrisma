"use client";

import SubmitButton from "@/components/Buttons/SubmitButton";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Path } from "react-hook-form";
import AuthFormWrapper from "@/components/Wrapper/AuthFormWrapper";
import { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

interface AuthFormProps<T extends z.ZodType<any, any>> {
  type: "Sign In" | "Sign Up";
  schema: T;
  defaultValues: z.infer<T>;
  onSubmit: (data: z.infer<T>) => void;
  isLoading?: boolean;
}

const AuthForm = <T extends z.ZodType<any, any>>({
  type,
  schema,
  defaultValues,
  onSubmit,
  isLoading = false,
}: AuthFormProps<T>) => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const form = useForm<z.infer<T>>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { errors } = form.formState;

  return (
    <AuthFormWrapper type={type}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<z.infer<T>>}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-2.5">
                  <FormLabel className="paragraph-medium">
                    {field.name === "email"
                      ? "Email Address"
                      : field.name === "confirmPassword"
                        ? "Confirm Password"
                        : field.name.charAt(0).toUpperCase() +
                          field.name.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        required
                        type={
                          field.name === "password" ||
                          field.name === "confirmPassword"
                            ? showPassword
                              ? "text"
                              : "password"
                            : "text"
                        }
                        {...field}
                        className={`paragraph-regular focus-visible:ring-0 focus-visible:border-2  outline-none min-h-12 rounded-1.5 border ${errors[field.name] ? "border-destructive border-2 focus-visible:border-destructive " : "focus-visible:border-blue-500"} `}
                      />
                      {field.name === "password" ||
                      field.name === "confirmPassword" ? (
                        <div
                          onClick={() => setShowPassword(!showPassword)}
                          className="cursor-pointer absolute right-4 top-1/3 "
                        >
                          {showPassword ? (
                            <EyeIcon className="size-5" />
                          ) : (
                            <EyeClosedIcon className="size-5" />
                          )}
                        </div>
                      ) : null}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <SubmitButton isLoading={isLoading} text={type} />
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default AuthForm;
