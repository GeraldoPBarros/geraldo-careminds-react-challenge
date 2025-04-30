"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setFieldError("");
    if (!email || !password) {
      setFieldError("All fields are required");
      return;
    }
    try {
      await login({ email, password });
    } catch (error) {
      toast.error("Login error");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Investment Portfolio
        </h2>

        <div className="mb-4 relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full pl-10 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
          />
        </div>

        <div className="mb-1 relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-10 pr-10 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>

        {fieldError && (
          <p className="mb-4 text-red-500 text-center">{fieldError}</p>
        )}

        <div className="flex mb-4 gap-4 mt-8">
          <button
            onClick={handleLogin}
            className="w-dvw bg-blue-500 hover:bg-blue-600 text-white py-2 rounded flex items-center justify-center cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <FiLoader className="animate-spin" size={24} />
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
