"use client";
import Image from "next/image";
import LogInButton from "@/app/components/CustomButton/LogInButton";
import { Home } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7055";

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/LibraryBase/Auth/LogIn`,
        { userName: username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.data) {
        const { token, data } = response.data; // Ambil token dan data
        const { userId, userName, msg } = data; // Ambil detail user

        if (!token) {
          setError("⚠️ Token tidak ditemukan dalam response.");
          return;
        }

        // ✅ Simpan token & user data ke localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userRole", msg.includes("Admin") ? "Admin" : "User"); // Tentukan role

        console.log("User Role:", localStorage.getItem("userRole"));

        // ✅ Redirect berdasarkan role
        if (msg.includes("Admin")) {
          router.push("/page/admin/category");
        } else {
          router.push("/page/main");
        }

        alert("✅ Login successful!");
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
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 text-xl border-2 border-black rounded-lg outline-none text-black font-semibold placeholder:text-gray-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 text-xl border-2 border-black rounded-lg outline-none text-black font-semibold placeholder:text-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 text-xl border-2 border-black rounded-lg outline-none text-black font-semibold placeholder:text-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <LogInButton onClick={handleLogin} />
        </div>
      </div>

      {/* Right Side (Image with Wave Shape) */}
      <div className="w-1/2 relative">
        <div className="absolute inset-0 bg-white rounded-full h-full w-3/4 left-[-10%] top-1/2 transform -translate-y-1/2 z-0"></div>
        <Image
          src="/img/library.png" // Ganti dengan gambar yang diunggah
          alt="Library Books"
          layout="fill"
          className="object-cover"
        />
      </div>
    </div>
  );
}
