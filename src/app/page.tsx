"use client";

import Portfolio from "@/app/portfolio/page";
import { useAuth } from "./hooks/useAuth";
import Login from "./login/page";

export default function Home() {
  const { user } = useAuth();
  let userSession = null;

  if (typeof window !== "undefined") {
    userSession = sessionStorage.getItem("user");
  }

  if (!user && !userSession) {
    return <Login />;
  }

  return <Portfolio />;
}
