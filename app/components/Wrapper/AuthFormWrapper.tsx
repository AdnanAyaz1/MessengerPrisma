import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import AuthButtons from "../Buttons/AuthButtons";


const AuthFormWrapper = ({
  children,
  type,
}: {
  children: ReactNode;
  type: string;
}) => {
  const title =
    type === "Sign In" ? "Sign In to your Account" : "Sign Up for an Account";
  const switchingRouteLink = type === "Sign In" ? "Sign Up" : "Sign In";
  const switchingRouteLinkPath = type === "Sign In" ? "/sign-up" : "/sign-in";
  const switchingRouteText =
    type === "Sign In" ? "Don't have an account?" : "Already have an account?";
  return (
    <div className="bg-gray-100 h-screen flex-center flex-col ">
      <Image src={"/icons/logo.png"} alt="Logo" height={48} width={48} />
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 font-inter">
        {title}
      </h2>
      <div className=" mt-3 bg-white shadow-md rounded-lg px-[32px] py-[40px]  w-[520px]">
        {children}
        <p className="paragraph-regular text-center mt-[25px]">
          {switchingRouteText}{" "}
          <Link
            href={switchingRouteLinkPath}
            className="text-blue-500 font-semibold"
          >
            {switchingRouteLink}
          </Link>
        </p>
        <AuthButtons />
      </div>
    </div>
  );
};

export default AuthFormWrapper;
