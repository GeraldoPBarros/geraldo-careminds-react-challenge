"use client";

import React from "react";

import { useAuth } from "@/app/hooks/useAuth";

export function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <button
      onClick={handleLogout}
      className="w-18 max-h-9 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded flex items-center justify-center cursor-pointer mr-12"
    >
      Logout
    </button>
  );
}
