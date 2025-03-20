"use client";
import Image from "next/image";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import SignUpButton from "./components/CustomButton/SignUp";
import LogInButton from "./components/CustomButton/LogInButton";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col md:flex-row bg-white ">
      {/* Bagian Kiri - Logo dan Tombol */}
      <div className="w-full md:w-1/2 h-screen flex flex-col items-center justify-center bg-white relative z-10">
        {/* Logo */}
        <div className="absolute top-6 left-6 flex items-center space-x-2">
          <Home className="w-8 h-8 text-black" />
          <h1 className="text-2xl font-bold">
            <span className="text-blue-600">Library</span>
            <span className="text-black">Base</span>
          </h1>
        </div>

        {/* Tombol Login & Sign Up (Tengah Layar) */}
        <div className="flex items-center space-x-4">
          <LogInButton onClick={() => router.push("/page/login")} />
          <span className="text-5xl text-black">/</span>
          <SignUpButton onClick={() => router.push("/page/register")} />
        </div>
      </div>

      {/* Bagian Kanan - Gambar (Disembunyikan di ≤ 768px) */}
      <div className="w-1/2 h-screen relative hidden md:block">
        <Image src="/img/library.png" alt="Library Books" layout="fill" />
      </div>
    </div>
  );
}
