"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiUploadCloud,
  FiX,
  FiAlertCircle,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";

export default function DashboardProfilePage() {
  const { user, updateUser } = useAuth();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [notification, setNotification] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setAvatar(user.avatar || "");
    }
  }, [user]);

  // Show auto-dismiss notifications
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
        showToast("Avatar uploaded successfully!");
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Please upload a valid image file (PNG, JPG, WEBP).", "error");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Save profile
  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Please enter your name.", "error");
      return;
    }
    if (!email.trim()) {
      showToast("Please enter your email.", "error");
      return;
    }

    updateUser({
      name,
      email,
      phone,
      address,
      avatar,
    });
    showToast("Profile updated successfully!");
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        {/* Floating Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border text-white max-w-md ${
                notification.type === "error"
                  ? "bg-red-600 border-red-500"
                  : "bg-emerald-600 border-emerald-500"
              }`}
            >
              {notification.type === "error" ? (
                <FiAlertCircle className="w-6 h-6 shrink-0" />
              ) : (
                <FiCheckCircle className="w-6 h-6 shrink-0" />
              )}
              <div className="text-sm font-semibold">{notification.message}</div>
              <button
                onClick={() => setNotification(null)}
                className="ml-auto hover:bg-white/10 p-1 rounded-xl transition-all duration-150"
              >
                <FiX className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Profile
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Manage your account information
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Avatar Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Profile Photo
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Avatar Display */}
              <div className="flex-shrink-0">
                {avatar ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg">
                    <img
                      src={avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setAvatar("")}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#4b0102] to-[#6b1c23] flex items-center justify-center text-white font-black text-6xl shadow-lg">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>

              {/* Upload Area */}
              <div className="flex-1 w-full">
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    dragActive
                      ? "border-[#4b0102] bg-[#4b0102]/5"
                      : "border-gray-200 dark:border-gray-700 hover:border-[#4b0102] hover:bg-[#4b0102]/5 dark:hover:bg-gray-700"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <FiUploadCloud className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Drag and drop an image or click to select
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PNG, JPG, WEBP up to 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info Section */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Personal Information
            </h2>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-4.5 h-4.5" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl pl-10 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-4.5 h-4.5" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl pl-10 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                Phone Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-4.5 h-4.5" />
                <input
                  type="text"
                  placeholder="+353 83 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl pl-10 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                Address
              </label>
              <div className="relative">
                <FiHome className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-4.5 h-4.5" />
                <textarea
                  placeholder="123 Main St, Dublin, Ireland"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl pl-10 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Role Info */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Account Role
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#4b0102] to-[#6b1c23] text-white">
                <FiShield className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white capitalize">
                  {user?.role || "member"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This is assigned by an administrator
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-8 py-3 rounded-2xl font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
            >
              <FiCheckCircle className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
