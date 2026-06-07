"use client";

import PageShell from "@/components/layout/PageShell";
import { useAuth } from "@/components/providers/AuthProvider";
import { useSite } from "@/components/providers/SiteProvider";
import { pages } from "@/lib/site-content";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLock, FiMail, FiUser } from "react-icons/fi";

const DEMO_CREDENTIALS = [
  {
    role: "Admin",
    email: "admin@abai.ie",
    password: "admin123",
    color: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900",
  },
  {
    role: "Moderator",
    email: "mod@abai.ie",
    password: "mod123",
    color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900",
  },
  {
    role: "Member",
    email: "member@abai.ie",
    password: "member123",
    color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900",
  },
];

export default function AuthPage({ mode }) {
  const { language } = useSite();
  const { signIn } = useAuth();
  const router = useRouter();
  const page = pages[mode][language];
  const isSignIn = mode === "signIn";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isSignIn) {
      const result = signIn(email, password);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error);
      }
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      alert("Sign up successful! Please sign in.");
      router.push("/sign-in");
    }
  };

  const handleCredentialClick = (cred) => {
    setEmail(cred.email);
    setPassword(cred.password);
  };

  return (
    <PageShell>
      <section className="px-4 py-16 sm:px-6">
        <div className={`mx-auto max-w-4xl grid ${isSignIn ? "lg:grid-cols-2" : "lg:grid-cols-1"}  gap-10 items-center justify-center`}>
          <div className={`hidden ${isSignIn && "hidden lg:block"}`}>
            <div className="rounded-[2rem] bg-[#071c17] p-10 text-white">
              <h2 className="text-3xl font-black">
                {isSignIn
                  ? "Demo Login Credientials"
                  : "Join Our Community"}
              </h2>
              <p className="mt-3 text-white/80">
                {isSignIn
                  ? "Sign in to access your dashboard and manage your account."
                  : "Create an account to participate in events and connect with the community."}
              </p>
              <div className="mt-10 grid gap-4">
                {DEMO_CREDENTIALS.map((cred) => (
                  <button
                    key={cred.role}
                    onClick={() => isSignIn && handleCredentialClick(cred)}
                    disabled={!isSignIn}
                    className={`p-4 rounded-2xl border text-left transition-all ${isSignIn
                      ? `${cred.color} hover:scale-[1.02] cursor-pointer`
                      : "bg-gray-100 dark:bg-gray-800 opacity-60 cursor-not-allowed"
                      }`}
                  >
                    <p className="font-bold">{cred.role}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {cred.email}
                    </p>
                    {isSignIn && (
                      <p className="text-xs text-[#4b0102] mt-2 font-semibold">
                        Click to auto-fill
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form
            className="w-full"
            onSubmit={handleSubmit}
          >
            <div className="rounded-[1.5rem] border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-[#0b1224] shadow-xl">
              <h1 className="text-2xl font-black text-[#191d1c] dark:text-white">
                {page.title}
              </h1>
              <p className="text-[#65716d] dark:text-white/70 mt-2 text-sm">
                {isSignIn
                  ? "Enter your credentials to continue"
                  : "Fill in the details to get started"}
              </p>

              {error && (
                <div className="mt-6 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                  {error}
                </div>
              )}

              <div className="mt-6 space-y-4">
                {!isSignIn && (
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b0102]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-12 rounded-2xl border border-black/10 bg-white pl-11 pr-4 text-sm font-semibold outline-none focus:border-[#4b0102] focus:ring-2 focus:ring-[#4b0102]/20 dark:border-white/10 dark:bg-[#07111f] dark:text-white"
                      placeholder={language === "bn" ? "পূর্ণ নাম" : "Full name"}
                      required
                    />
                  </div>
                )}
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b0102]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 rounded-2xl border border-black/10 bg-white pl-11 pr-4 text-sm font-semibold outline-none focus:border-[#4b0102] focus:ring-2 focus:ring-[#4b0102]/20 dark:border-white/10 dark:bg-[#07111f] dark:text-white"
                    placeholder={language === "bn" ? "ইমেইল" : "Email"}
                    required
                  />
                </div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b0102]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 rounded-2xl border border-black/10 bg-white pl-11 pr-4 text-sm font-semibold outline-none focus:border-[#4b0102] focus:ring-2 focus:ring-[#4b0102]/20 dark:border-white/10 dark:bg-[#07111f] dark:text-white"
                    placeholder={language === "bn" ? "পাসওয়ার্ড" : "Password"}
                    required
                  />
                </div>
                {!isSignIn && (
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b0102]" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-12 rounded-2xl border border-black/10 bg-white pl-11 pr-4 text-sm font-semibold outline-none focus:border-[#4b0102] focus:ring-2 focus:ring-[#4b0102]/20 dark:border-white/10 dark:bg-[#07111f] dark:text-white"
                      placeholder={language === "bn" ? "পাসওয়ার্ড নিশ্চিত" : "Confirm password"}
                      required
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="mt-8 w-full h-12 rounded-full bg-[#4b0102] text-sm font-black text-white hover:bg-[#3a0101] transition-colors shadow-[0_12px_30px_rgba(75,1,2,0.28)]"
              >
                {page.title}
              </button>

              <p className="text-center text-sm font-semibold text-[#65716d] dark:text-white/70 mt-6">
                {isSignIn ? (
                  <>
                    {language === "bn" ? "অ্যাকাউন্ট নেই? " : "No account? "}
                    <Link href="/sign-up" className="font-black text-[#4b0102] hover:underline">
                      {language === "bn" ? "সাইন আপ" : "Sign up"}
                    </Link>
                  </>
                ) : (
                  <>
                    {language === "bn" ? "ইতিমধ্যে সদস্য? " : "Already a member? "}
                    <Link href="/sign-in" className="font-black text-[#4b0102] hover:underline">
                      {language === "bn" ? "সাইন ইন" : "Sign in"}
                    </Link>
                  </>
                )}
              </p>

              <div className="lg:hidden mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3">
                  Demo Accounts (Click to fill):
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {DEMO_CREDENTIALS.map((cred) => (
                    <button
                      key={cred.role}
                      onClick={() => isSignIn && handleCredentialClick(cred)}
                      disabled={!isSignIn}
                      className={`p-3 rounded-xl border text-left text-xs ${isSignIn
                        ? `${cred.color} hover:scale-[1.01] transition-transform cursor-pointer`
                        : "bg-gray-100 dark:bg-gray-800 opacity-60 cursor-not-allowed"
                        }`}
                    >
                      <p className="font-bold">{cred.role}</p>
                      <p className="text-gray-600 dark:text-gray-400">{cred.email}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}