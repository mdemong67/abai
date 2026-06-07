"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// Mock users data for demo
const MOCK_USERS = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@abai.ie",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "Moderator User",
    email: "mod@abai.ie",
    password: "mod123",
    role: "moderator",
  },
  {
    id: 3,
    name: "Regular Member",
    email: "member@abai.ie",
    password: "member123",
    role: "member",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = window.localStorage.getItem("abai-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user");
      }
    }
    setLoading(false);
  }, []);

  const signIn = (email, password) => {
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password;
      setUser(userData);
      window.localStorage.setItem("abai-user", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  };

  const signOut = () => {
    setUser(null);
    window.localStorage.removeItem("abai-user");
  };

  const updateRole = (role) => {
    const foundUser = MOCK_USERS.find((u) => u.role === role);
    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password;
      setUser(userData);
      window.localStorage.setItem("abai-user", JSON.stringify(userData));
    } else {
      // Fallback: just update the role on current user
      setUser(prev => {
        if (!prev) return null;
        const updated = { ...prev, role };
        window.localStorage.setItem("abai-user", JSON.stringify(updated));
        return updated;
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, updateRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
