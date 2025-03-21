"use client";
import Image from "next/image";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import SignUpButton from "@/app/components/CustomButton/SignUp";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("https://localhost:7055/api/LibraryBase/Auth/SignUp/Customer", {
        userName: username,
        password,
        email,
      });

      alert("Register successful!");
      router.push("/page/login");
      console.log(response.data); // Redirect setelah login sukses
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Left Side (Login Form) */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10 relative">
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <Home className="w-8 h-8 text-black hover:scale-110 cursor-pointer" onClick={() => router.push("/")} />
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
          <SignUpButton onClick={handleRegister} />
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
