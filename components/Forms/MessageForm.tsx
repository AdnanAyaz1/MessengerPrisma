"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import axios from "axios";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useConversation from "@/hooks/useConversation";

const messageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

const MessageForm = () => {
  const { conversationId } = useConversation();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: { message: "" },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      reset(); // Reset form after successful submission
      await axios.post("/api/messages", { ...data, conversationId });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleUpload = async (results: CloudinaryUploadWidgetResults) => {
    try {
      //  console.log("image upload results", results);
      if (
        results.event === "success" &&
        typeof results.info === "object" &&
        results.info !== null
      )
        await axios.post("/api/messages", {
          image: results.info.secure_url,
          conversationId,
        });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadWidget uploadPreset="DevFlow" onSuccessAction={handleUpload}>
        {({ open }) => {
          return (
            <HiPhoto
              size={30}
              className="text-sky-500 cursor-pointer"
              onClick={() => open()}
            />
          );
        }}
      </CldUploadWidget>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 lg:gap-4 w-full"
        >
          <FormField
            control={control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Write a message"
                    className="w-full rounded-full focus-visible:ring-0 focus-visible:border-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full p-2 bg-sky-500 hover:bg-sky-600 transition cursor-pointer"
          >
            <HiPaperAirplane size={18} className="text-white" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MessageForm;
