import type { Metadata } from "next";
import { Roboto, Inter, Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
    <html
      lang="en"
      className={`${roboto.variable} ${inter.variable} ${geist.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
