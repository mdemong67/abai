"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import RichTextEditor from "@/components/RichTextEditor";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiFileText, FiSave, FiUploadCloud, FiX } from "react-icons/fi";

function getPlainTextFromLexicalJson(jsonString) {
  if (!jsonString) return "";
  if (typeof jsonString !== "string" || !jsonString.startsWith("{")) return jsonString;
  try {
    const obj = JSON.parse(jsonString);
    let text = "";
    const extract = (node) => {
      if (node.text) {
        text += node.text;
      }
      if (node.children) {
        node.children.forEach(extract);
      }
    };
    if (obj.root) {
      extract(obj.root);
    }
    return text;
  } catch (e) {
    return jsonString;
  }
}

const INITIAL_DATA = {
  title: "Constitution",
  content: "",
  image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop&q=80",
};

export default function ConstitutionPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [tempData, setTempData] = useState(INITIAL_DATA);
  const [notification, setNotification] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const STORAGE_KEY = "abai-constitution";

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
        setTempData(parsed);
      } catch (e) {
        console.error("Error loading data", e);
      }
    }
    setIsLoading(false);
  }, []);

  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempData({ ...tempData, image: e.target.result });
        showToast("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Please upload a valid image file!", "error");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSave = () => {
    setData(tempData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tempData));
    showToast("Constitution content saved successfully!");
  };

  if (isLoading) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="py-24 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm font-semibold">Loading...</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="max-w-5xl mx-auto pb-16 space-y-8">
        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border text-white max-w-md ${notification.type === "error"
                ? "bg-red-600 border-red-500"
                : "bg-emerald-600 border-emerald-500"
                }`}
            >
              {notification.type === "error" ? <FiAlertCircle /> : <FiCheckCircle />}
              <span className="text-sm font-semibold">{notification.message}</span>
              <button onClick={() => setNotification(null)} className="ml-auto hover:bg-white/10 p-1 rounded-xl">
                <FiX />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#4b0102]/10 text-[#4b0102]">
              <FiFileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Constitution</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage Constitution page content</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-6 py-3 rounded-2xl font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
          >
            <FiSave className="w-5 h-5" />
            Save Changes
          </button>
        </div>

        {/* Content Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Image */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block mb-4">
                Constitution Image
              </label>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 mb-4">
                <img src={tempData.image} alt="Constitution preview" className="w-full h-full object-cover" />
              </div>
              <div
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${dragActive
                  ? "border-[#4b0102] bg-[#4b0102]/5"
                  : "border-gray-200 dark:border-gray-700 hover:border-[#4b0102] hover:bg-[#4b0102]/5 dark:hover:bg-gray-700"
                  }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
                  className="hidden"
                />
                <FiUploadCloud className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Drag and drop or click to select image
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                  Title
                </label>
                <input
                  type="text"
                  value={tempData.title}
                  onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-lg font-bold text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                  placeholder="Constitution"
                />
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-2 pt-2 flex flex-col">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500">
                    Content
                  </label>
                  <span className="text-[10px] text-gray-400 font-bold">
                    {getPlainTextFromLexicalJson(tempData.content).length} chars | {getPlainTextFromLexicalJson(tempData.content).split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>

                <RichTextEditor
                  key={isLoading ? "loading" : "loaded"}
                  value={tempData.content}
                  onChange={(newContent) => setTempData({ ...tempData, content: newContent })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fixed bottom button for mobile */}
        <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
          <button
            onClick={handleSave}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/30 transition-all cursor-pointer"
          >
            <FiSave className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}