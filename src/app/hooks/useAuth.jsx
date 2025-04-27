"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FIREBASE_AUTH } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { redirect } from "next/navigation";
import { setToken, deleteToken } from "@/app/actions/token";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(
      FIREBASE_AUTH,
      async (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
          });
          sessionStorage.setItem("user", true);
          const token = await firebaseUser.getIdToken(true);
          await setToken(token);
          toast.success("Success!");
          setLoading(false);
          redirect("/portfolio");
        } else {
          setUser(null);
          sessionStorage.removeItem("user");
          await deleteToken();
          setLoading(false);
          redirect("login");
        }
      }
    );
    return () => unsubscribe();
  }, []);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error) {
      console.error(error);
      let errorMsg;
      if (error.code) {
        switch (error.code) {
          case "auth/user-not-found":
            errorMsg = "User not found";
            break;
          case "auth/wrong-password":
            errorMsg = "Wrong password";
            break;
          default:
            errorMsg = error.message;
        }
      } else {
        errorMsg = error.response?.data?.message || error.message;
      }
      toast.error("Login error: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try { 
      await signOut(FIREBASE_AUTH);
    } catch (error) {
      console.error(error);
      toast.error("Logout error: " + error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth should be used inside of an AuthProvider");
  }
  return context;
};
