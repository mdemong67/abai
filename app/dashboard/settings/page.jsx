"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/components/providers/AuthProvider";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiCode,
  FiGlobe,
  FiImage,
  FiLink,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSave,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

// Default seed settings
const SEED_SETTINGS = {
  hero: {
    title: "Welcome to ABAI Community",
    subtitle: "Connecting members of the Bangladeshi community in Ireland",
    ctaPrimaryText: "Join Us",
    ctaPrimaryLink: "/join",
    ctaSecondaryText: "Learn More",
    ctaSecondaryLink: "/about",
    backgroundImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=80",
  },
  metadata: {
    siteTitle: "ABAI - Bangladeshi Community in Ireland",
    siteDescription: "ABAI is a community organization for Bangladeshi people living in Ireland, fostering connection, culture, and support.",
    siteKeywords: "Bangladeshi, Ireland, community, Dublin, culture, support",
    ogImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80",
  },
  contact: {
    email: "contact@abai.ie",
    phone: "+353 83 123 4567",
    address: "123 O'Connell Street, Dublin 1, Ireland",
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/abaiireland" },
      { platform: "instagram", url: "https://instagram.com/abaiireland" },
      { platform: "twitter", url: "https://twitter.com/abaiireland" },
      { platform: "youtube", url: "https://youtube.com/@abaiireland" },
    ],
  },
  footer: {
    copyrightText: "© 2026 ABAI Community. All rights reserved.",
  },
  appearance: {
    primaryColor: "#4b0102",
    darkModeEnabled: true,
  },
};

export default function DashboardSiteSettingsPage() {
  const { user } = useAuth();

  // State
  const [settings, setSettings] = useState(SEED_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("hero");
  const [tempSettings, setTempSettings] = useState({ ...SEED_SETTINGS });

  // Drag and drop file refs and state
  const heroImageInputRef = useRef(null);
  const ogImageInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(null); // "hero" or "og" or null

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("abai-site-settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        setTempSettings(parsed);
      } catch (e) {
        setSettings(SEED_SETTINGS);
        setTempSettings(SEED_SETTINGS);
      }
    } else {
      setSettings(SEED_SETTINGS);
      setTempSettings(SEED_SETTINGS);
    }
    setIsLoading(false);
  }, []);

  // Show toast notifications
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Handle file processing
  const processFile = (file, type) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempSettings((prev) => ({
          ...prev,
          hero:
            type === "hero"
              ? { ...prev.hero, backgroundImage: event.target.result }
              : prev.hero,
          metadata:
            type === "og"
              ? { ...prev.metadata, ogImage: event.target.result }
              : prev.metadata,
        }));
        showToast(`${type === "hero" ? "Hero" : "OG"} image updated successfully!`);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Please upload a valid image file (PNG, JPG, WEBP).", "error");
    }
  };

  // Drag and drop handlers
  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(type);
    } else if (e.type === "dragleave") {
      setDragActive(null);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0], type);
    }
  };

  // Save all settings
  const handleSaveAll = () => {
    setSettings(tempSettings);
    localStorage.setItem("abai-site-settings", JSON.stringify(tempSettings));
    showToast("Site settings saved successfully!");
  };

  // Update specific section in temp settings
  const updateTempSection = (section, field, value) => {
    setTempSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Update social link specifically
  const updateSocialLink = (index, field, value) => {
    setTempSettings((prev) => {
      const updated = [...prev.contact.socialLinks];
      updated[index][field] = value;
      return {
        ...prev,
        contact: {
          ...prev.contact,
          socialLinks: updated,
        },
      };
    });
  };

  const tabs = [
    { id: "hero", label: "Hero Banner", icon: FiImage },
    { id: "metadata", label: "Site Metadata", icon: FiGlobe },
    { id: "contact", label: "Contact Info", icon: FiPhone },
    { id: "footer", label: "Footer", icon: FiCode },
    { id: "appearance", label: "Appearance", icon: FiImage },
  ];

  if (isLoading) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="py-24 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm font-semibold">Loading site settings...</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-8 w-full mx-auto pb-16">
        {/* Floating Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-lg shadow-2xl border text-white max-w-md ${notification.type === "error"
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
                className="ml-auto hover:bg-white/10 p-1 rounded-lg transition-all duration-150"
              >
                <FiX className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Site Settings
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Configure and manage your website&apos;s appearance & content
            </p>
          </div>
          <button
            onClick={handleSaveAll}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
          >
            <FiSave className="w-5 h-5" />
            Save All Changes
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-100 dark:border-gray-700 shadow-sm overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${activeTab === tab.id
                  ? "bg-white dark:bg-gray-700 text-[#4b0102] dark:text-accent shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                <tab.icon className="w-4.5 h-4.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === "hero" && (
              <motion.div
                key="hero-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-8"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Hero Banner Settings
                </h2>

                {/* Hero Image Upload */}
                <div className="space-y-4">
                  <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                    Background Image
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                      <img
                        src={tempSettings.hero.backgroundImage}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      onDragEnter={(e) => handleDrag(e, "hero")}
                      onDragLeave={(e) => handleDrag(e, null)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={(e) => handleDrop(e, "hero")}
                      onClick={() => heroImageInputRef.current?.click()}
                      className={`h-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${dragActive === "hero"
                        ? "border-[#4b0102] bg-[#4b0102]/5"
                        : "border-gray-200 dark:border-gray-700 hover:border-[#4b0102] hover:bg-[#4b0102]/5 dark:hover:bg-gray-700"
                        }`}
                    >
                      <input
                        ref={heroImageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files?.[0] && processFile(e.target.files[0], "hero")
                        }
                        className="hidden"
                      />
                      <FiUploadCloud className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-3" />
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        PNG, JPG, WEBP up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hero Text Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Main Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter hero banner title..."
                      value={tempSettings.hero.title}
                      onChange={(e) =>
                        updateTempSection("hero", "title", e.target.value)
                      }
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-lg font-bold text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Subtitle
                    </label>
                    <textarea
                      placeholder="Enter hero banner subtitle..."
                      value={tempSettings.hero.subtitle}
                      onChange={(e) =>
                        updateTempSection("hero", "subtitle", e.target.value)
                      }
                      rows={2}
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Primary CTA Text
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Join Us"
                      value={tempSettings.hero.ctaPrimaryText}
                      onChange={(e) =>
                        updateTempSection("hero", "ctaPrimaryText", e.target.value)
                      }
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Primary CTA Link
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. /join"
                      value={tempSettings.hero.ctaPrimaryLink}
                      onChange={(e) =>
                        updateTempSection("hero", "ctaPrimaryLink", e.target.value)
                      }
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Secondary CTA Text
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Learn More"
                      value={tempSettings.hero.ctaSecondaryText}
                      onChange={(e) =>
                        updateTempSection("hero", "ctaSecondaryText", e.target.value)
                      }
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Secondary CTA Link
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. /about"
                      value={tempSettings.hero.ctaSecondaryLink}
                      onChange={(e) =>
                        updateTempSection("hero", "ctaSecondaryLink", e.target.value)
                      }
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "metadata" && (
              <motion.div
                key="metadata-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Site Metadata & SEO
                </h2>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Site Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter site title..."
                      value={tempSettings.metadata.siteTitle}
                      onChange={(e) =>
                        updateTempSection("metadata", "siteTitle", e.target.value)
                      }
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Site Description
                    </label>
                    <textarea
                      placeholder="Enter a brief description of your site..."
                      value={tempSettings.metadata.siteDescription}
                      onChange={(e) =>
                        updateTempSection("metadata", "siteDescription", e.target.value)
                      }
                      rows={3}
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent resize-none"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {tempSettings.metadata.siteDescription.length}/160 characters recommended
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Keywords
                    </label>
                    <input
                      type="text"
                      placeholder="Keyword 1, Keyword 2, Keyword 3..."
                      value={tempSettings.metadata.siteKeywords}
                      onChange={(e) =>
                        updateTempSection("metadata", "siteKeywords", e.target.value)
                      }
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                    />
                  </div>

                  {/* OG Image Upload */}
                  <div className="space-y-4">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Open Graph Image
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      <div className="relative aspect-video rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <img
                          src={tempSettings.metadata.ogImage}
                          alt="OG preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div
                        onDragEnter={(e) => handleDrag(e, "og")}
                        onDragLeave={(e) => handleDrag(e, null)}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onDrop={(e) => handleDrop(e, "og")}
                        onClick={() => ogImageInputRef.current?.click()}
                        className={`h-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${dragActive === "og"
                          ? "border-[#4b0102] bg-[#4b0102]/5"
                          : "border-gray-200 dark:border-gray-700 hover:border-[#4b0102] hover:bg-[#4b0102]/5 dark:hover:bg-gray-700"
                          }`}
                      >
                        <input
                          ref={ogImageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            e.target.files?.[0] && processFile(e.target.files[0], "og")
                          }
                          className="hidden"
                        />
                        <FiUploadCloud className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-3" />
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Upload OG Image
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Recommended size: 1200x630
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "contact" && (
              <motion.div
                key="contact-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-8"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Contact & Social Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block flex items-center gap-2">
                      <FiMail className="w-4 h-4" /> Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="contact@abai.ie"
                      value={tempSettings.contact.email}
                      onChange={(e) =>
                        updateTempSection("contact", "email", e.target.value)
                      }
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block flex items-center gap-2">
                      <FiPhone className="w-4 h-4" /> Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="+353 83 123 4567"
                      value={tempSettings.contact.phone}
                      onChange={(e) =>
                        updateTempSection("contact", "phone", e.target.value)
                      }
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block flex items-center gap-2">
                      <FiMapPin className="w-4 h-4" /> Physical Address
                    </label>
                    <textarea
                      placeholder="Enter full address..."
                      value={tempSettings.contact.address}
                      onChange={(e) =>
                        updateTempSection("contact", "address", e.target.value)
                      }
                      rows={2}
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
                    Social Links
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tempSettings.contact.socialLinks.map((link, index) => (
                      <div key={index} className="space-y-2">
                        <label className="text-xs font-bold text-gray-600 dark:text-gray-300 capitalize">
                          {link.platform}
                        </label>
                        <div className="relative">
                          <FiLink className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-4.5 h-4.5" />
                          <input
                            type="text"
                            placeholder={`https://${link.platform}.com/...`}
                            value={link.url}
                            onChange={(e) =>
                              updateSocialLink(index, "url", e.target.value)
                            }
                            className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "footer" && (
              <motion.div
                key="footer-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Footer Settings
                </h2>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                    Copyright Text
                  </label>
                  <input
                    type="text"
                    placeholder="© 2026 ABAI Community..."
                    value={tempSettings.footer.copyrightText}
                    onChange={(e) =>
                      updateTempSection("footer", "copyrightText", e.target.value)
                    }
                    className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                  />
                </div>
              </motion.div>
            )}

            {activeTab === "appearance" && (
              <motion.div
                key="appearance-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Site Appearance
                </h2>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Primary Color
                    </label>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                        style={{ backgroundColor: tempSettings.appearance.primaryColor }}
                      />
                      <input
                        type="color"
                        value={tempSettings.appearance.primaryColor}
                        onChange={(e) =>
                          updateTempSection("appearance", "primaryColor", e.target.value)
                        }
                        className="w-full h-12 cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        Enable Dark Mode
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Allow users to toggle between light and dark themes
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updateTempSection(
                          "appearance",
                          "darkModeEnabled",
                          !tempSettings.appearance.darkModeEnabled
                        )
                      }
                      className={`w-14 h-7 rounded-full relative transition-colors ${tempSettings.appearance.darkModeEnabled
                        ? "bg-[#4b0102]"
                        : "bg-gray-200 dark:bg-gray-700"
                        }`}
                    >
                      <div
                        className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${tempSettings.appearance.darkModeEnabled
                          ? "translate-x-8"
                          : "translate-x-1"
                          }`}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fixed bottom save button for mobile */}
        <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
          <button
            onClick={handleSaveAll}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-6 py-3.5 rounded-lg font-bold shadow-lg shadow-primary/30 transition-all cursor-pointer"
          >
            <FiSave className="w-5 h-5" />
            Save All Changes
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
