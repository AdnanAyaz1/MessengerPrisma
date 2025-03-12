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
  const form = useForm<z.infer<T>>({
    defaultValues,
    resolver: zodResolver(schema),
  });

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
                      : field.name.charAt(0).toUpperCase() +
                        field.name.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      type={field.name === "password" ? "password" : "text"}
                      {...field}
                      className="paragraph-regular focus-visible:ring-0 focus-visible:border-2 focus-visible:border-blue-500 outline-none min-h-12 rounded-1.5 border"
                    />
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
