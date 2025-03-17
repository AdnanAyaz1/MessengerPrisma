import type { Metadata } from "next";
import React from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Messenger",
  description:
    "This is a Messenger clone that is build using Next JS with Prisma and MongoDB as the database , Tailwind CSS for styling the components and Pusher for real-time messaging",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`antialiased font-urbanist`}>
      <SessionProvider>
        <body>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
        </body>
      </SessionProvider>
    </html>
  );
}
