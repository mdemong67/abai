"use client";

import { useEffect, useRef, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import RichTextEditor from "@/components/RichTextEditor";
import { motion, AnimatePresence } from "framer-motion";
import { FiUploadCloud, FiX, FiAlertCircle, FiCheckCircle, FiSave, FiUser } from "react-icons/fi";

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
  presidentName: "President Name",
  title: "President's Statement",
  content: "",
  presidentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
  bannerImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&auto=format&fit=crop&q=80",
};

export default function PresidentStatementPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [tempData, setTempData] = useState(INITIAL_DATA);
  const [notification, setNotification] = useState(null);
  const [dragActive, setDragActive] = useState(null);
  const presidentImageRef = useRef(null);
  const bannerImageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const STORAGE_KEY = "abai-president-statement";

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

  const processFile = (file, type) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempData({
          ...tempData,
          [type]: e.target.result,
        });
        showToast("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Please upload a valid image file!", "error");
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0], type);
    }
  };

  const handleSave = () => {
    setData(tempData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tempData));
    showToast("President's Statement content saved successfully!");
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
              className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border text-white max-w-md ${
                notification.type === "error"
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
              <FiUser className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                President's Statement
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage President's Statement page content</p>
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
          {/* Left Column: Images */}
          <div className="space-y-6">
            {/* Banner Image */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block mb-4">
                Banner Image
              </label>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 mb-4">
                <img src={tempData.bannerImage} alt="Banner preview" className="w-full h-full object-cover" />
              </div>
              <div
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive("banner");
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(null);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => handleDrop(e, "bannerImage")}
                onClick={() => bannerImageRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  dragActive === "banner"
                    ? "border-[#4b0102] bg-[#4b0102]/5"
                    : "border-gray-200 dark:border-gray-700 hover:border-[#4b0102] hover:bg-[#4b0102]/5 dark:hover:bg-gray-700"
                }`}
              >
                <input
                  ref={bannerImageRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0], "bannerImage")}
                  className="hidden"
                />
                <FiUploadCloud className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Drag and drop or click to select banner
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
              </div>
            </div>

            {/* President's Photo */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block mb-4">
                President's Photo
              </label>
              <div className="relative aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 mb-4">
                <img src={tempData.presidentImage} alt="President preview" className="w-full h-full object-cover" />
              </div>
              <div
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive("president");
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(null);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => handleDrop(e, "presidentImage")}
                onClick={() => presidentImageRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  dragActive === "president"
                    ? "border-[#4b0102] bg-[#4b0102]/5"
                    : "border-gray-200 dark:border-gray-700 hover:border-[#4b0102] hover:bg-[#4b0102]/5 dark:hover:bg-gray-700"
                }`}
              >
                <input
                  ref={presidentImageRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0], "presidentImage")}
                  className="hidden"
                />
                <FiUploadCloud className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Drag and drop or click to select photo
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
                  President's Name
                </label>
                <input
                  type="text"
                  value={tempData.presidentName}
                  onChange={(e) => setTempData({ ...tempData, presidentName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-lg font-bold text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                  placeholder="President Name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                  Statement Title
                </label>
                <input
                  type="text"
                  value={tempData.title}
                  onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                  placeholder="President's Statement"
                />
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-2 pt-2 flex flex-col">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500">
                    Statement Content
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