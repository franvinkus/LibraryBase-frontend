"use client";
import Image from "next/image";
import LogInButton from "@/app/components/CustomButton/LogInButton";
import style from "./login.module.css";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="flex h-screen w-full bg-white">
      {/* Left Side (Login Form) */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10 relative">
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <Home className={style["home-icon"]} onClick={() => router.push("/")} />
          <span className="text-2xl font-bold">
            <span className="text-blue-600">Library</span>
            <span className="text-black">Base</span>
          </span>
        </div>

        <div className="w-3/4 md:w-2/3 lg:w-1/2 space-y-6">
          <input type="text" placeholder="Username" className={style["input-field"]} />
          <input type="password" placeholder="Password" className={style["input-field"]} />
          <LogInButton onClick={() => alert("Login")} />
        </div>
      </div>

      {/* Right Side (Image with Wave Shape) */}
      <div className="w-1/2 relative">
        <div className="absolute inset-0 bg-white rounded-full h-full w-3/4 left-[-10%] top-1/2 transform -translate-y-1/2 z-0"></div>
        <Image
          src="/img/library.png" // Ganti dengan gambar yang diunggah
          alt="Library Books"
          layout="fill"
        />
      </div>
    </div>
  );
}
