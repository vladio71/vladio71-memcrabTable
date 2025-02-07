import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
// import Table from "@/components/Table/Table";
// import InputsBar from "@/components/InputsBar";
// import { useState } from "react";
import App from "@/components/App";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
       <App />
   );
}
