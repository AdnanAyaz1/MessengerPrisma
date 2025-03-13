import { clsx, type ClassValue } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const apiResponse = <T>(
  message: string,
  success: boolean,
  status: number,
  data?: T
): NextResponse => {
  return NextResponse.json({
    message,
    success,
    status,
    data,
  });
};

export const handleApiError = (error: unknown) => {
  if (error instanceof Error) {
    return apiResponse(error.message, false, 500);
  }
  return apiResponse("An unexpected error occurred", false, 500);
};

export const extractErrorMessages = (
  error: Record<string, string[]>
): string => {
  // console.log("this is error", error);
  const messageArray: string[][] = Object.keys(error).map(
    (message) => error[message]
  );
  // console.log("This is mapped message", messageArray);
  const message = messageArray.join(",");
  // console.log("This is joined Message", message);
  return message;
};
