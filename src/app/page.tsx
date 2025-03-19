"use client";
import Image from "next/image";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import SignUpButton from "./components/CustomButton/SignUp";
import LogInButton from "./components/CustomButton/LogInButton";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="h-screen flex">
      {/* Bagian Kiri - Logo dan Tombol */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white relative z-10">
        {/* Logo */}
        <div className="flex items-center space-x-2 absolute top-6 left-6">
          <Home className="w-8 h-8 text-black" />
          <h1 className="text-2xl font-bold">
            <span className="text-blue-600">Library</span>
            <span className="text-black">Base</span>
          </h1>
        </div>

        {/* Tombol Login & Sign Up */}
        <div className="flex items-center space-x-4">
          <LogInButton onClick={() => router.push("/page/login")} />
          <span className="text-5xl  text-black ">/</span>
          <SignUpButton onClick={() => router.push("/page/register")} />
        </div>
      </div>
      <div className="w-1/2 relative">
        <div className="absolute inset-0 bg-white rounded-full h-full w-3/4 left-[-10%] top-1/2 transform -translate-y-1/2 z-0"></div>
        <Image
          src="/img/library.png" // Ganti dengan gambar yang diunggah
          alt="Library Books"
          layout="fill"
        />
        {/* Bagian Kanan - Gambar Rak Buku */}
      </div>
    </div>
  );
}
