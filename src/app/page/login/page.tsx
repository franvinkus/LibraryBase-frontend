"use client";
import Image from "next/image";
import LogInButton from "@/app/components/CustomButton/LogInButton";
import { Home } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState(""); // Bisa username atau email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7055";

  const handleLogin = async () => {
    try {
      // Cek apakah input adalah email (mengandung "@")
      const isEmail = identifier.includes("@");

      // Bentuk request body sesuai input
      const requestBody = isEmail ? { email: identifier, password } : { userName: identifier, password };

      const response = await axios.post(`${API_BASE_URL}/api/LibraryBase/Auth/LogIn`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.data) {
        const { token, data } = response.data;
        const { userId, userName, msg } = data;

        if (!token) {
          setError("⚠️ Token tidak ditemukan dalam response.");
          return;
        }

        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userRole", msg.includes("Admin") ? "Admin" : "User");

        console.log("User Role:", localStorage.getItem("userRole"));

        if (msg.includes("Admin")) {
          Swal.fire({
            icon: "success",
            title: "LogIn Success",
            text: "You have been LogIn as Admin successfully.",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            router.push("/page/admin/category");
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "LogIn Success",
            text: "You have been LogIn as Customer successfully.",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            router.push("/page/main");
          });
        }
      } else {
        setError("⚠ Response dari server kosong.");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "❌ Login gagal, silakan coba lagi.");
      } else {
        setError("⚠ Terjadi kesalahan yang tidak terduga.");
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Left Side (Login Form) */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10 relative">
        <div className="absolute top-5 left-5 flex items-center gap-2 hover:scale-110 transition ease-in-out duration-300" onClick={() => router.push("/")}>
          <Home className="w-8 h-8 text-black hover:scale-110 cursor-pointer" />
          <span className="text-2xl font-bold">
            <span className="text-blue-600">Library</span>
            <span className="text-black">Base</span>
          </span>
        </div>

        <div className="w-3/4 md:w-2/3 lg:w-1/2 space-y-6">
          {error && <p className="text-red-500">{error}</p>}
          {/* ✅ Input bisa diisi dengan username atau email */}
          <input
            type="text"
            placeholder="Username or Email"
            className="w-full px-4 py-3 text-xl border-2 border-black rounded-lg outline-none text-black font-semibold placeholder:text-gray-400"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 text-xl border-2 border-black rounded-lg outline-none text-black font-semibold placeholder:text-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LogInButton onClick={handleLogin} />
        </div>
      </div>

      {/* Right Side (Image with Wave Shape) */}
      <div className="w-1/2 relative">
        <div className="absolute inset-0 bg-white rounded-full h-full w-3/4 left-[-10%] top-1/2 transform -translate-y-1/2 z-0"></div>
        <Image src="/img/library.png" alt="Library Books" layout="fill" className="object-cover" />
      </div>
    </div>
  );
}
