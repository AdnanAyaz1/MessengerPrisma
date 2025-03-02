"use client";

import AuthFormWrapper from "@/app/components/Wrapper/AuthFormWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/zod-validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Path } from "react-hook-form";
import { z } from "zod";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const defualtValues = { username: "", email: "", password: "" };
  const form = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: defualtValues,
    resolver: zodResolver(signUpSchema),
  });

  const handleSubmit = () => {};
  return (
    <AuthFormWrapper type="Sign Up">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-10 space-y-6"
        >
          {Object.keys(defualtValues).map((field) => {
            return (
              <FormField
                key={field}
                control={form.control}
                name={field as Path<z.infer<typeof signUpSchema>>}
                render={({ field }) => {
                  return (
                    <FormItem className="flex w-full flex-col gap-2.5">
                      <FormLabel className="paragraph-medium ">
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
                          className="paragraph-regular  focus-visible:ring-0 focus-visible:border-2 focus-visible:border-blue-500 outline-none  min-h-12 rounded-1.5 border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })}
          <Button
            variant={"ghost"}
            className="bg-blue-400 cursor-pointer hover:bg-blue-400/80 w-full h-[45px] paragraph-semibold text-white hover:text-white active:scale-95 duration-150 transition-all ease-in-out"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
              <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default page;
