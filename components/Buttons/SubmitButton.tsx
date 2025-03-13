import React from "react";
import { Button } from "../ui/button";
import { LoaderCircleIcon } from "lucide-react";

const SubmitButton = ({
  isLoading,
  text,
  disabled,
}: {
  isLoading: boolean;
  text: string;
  disabled: boolean;
}) => {
  return (
    <Button
      variant={"ghost"}
      className="bg-blue-400 cursor-pointer hover:bg-blue-400/80 w-full h-[45px] paragraph-semibold text-white hover:text-white active:scale-95 duration-150 transition-all ease-in-out"
      type="submit"
      disabled={isLoading || disabled}
    >
      {isLoading && <LoaderCircleIcon className="mr-2 size-4 animate-spin" />}
      {text}
    </Button>
  );
};

export default SubmitButton;
