"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiCalendar,
  FiUser,
  FiSearch,
  FiTag,
  FiArrowLeft,
  FiLock,
  FiUploadCloud,
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiLink,
  FiImage,
  FiX,
  FiEye,
  FiAlertCircle,
  FiCheckCircle,
  FiFolder,
} from "react-icons/fi";

// Default seed portfolios if localStorage is empty
const SEED_PORTFOLIOS = [
  {
    id: 1,
    title: "2024 Community Cultural Festival",
    description: "A photo album capturing highlights from our annual cultural festival featuring traditional music, dance performances, and food stalls.",
    author: "Admin User",
    authorRole: "admin",
    date: "2024-08-15",
    category: "Cultural Events",
    tags: ["Festival", "Photos", "Community"],
    image: "https://images.unsplash.com/photo-1508186300540-389e4e244e18?w=800&auto=format&fit=crop&q=60",
    status: "Published",
  },
  {
    id: 2,
    title: "Eid Ul-Fitr 2024 Celebration",
    description: "Beautiful moments shared during our community Eid celebration, including morning prayers and feast preparations.",
    author: "Moderator User",
    authorRole: "moderator",
    date: "2024-04-22",
    category: "Religious Events",
    tags: ["Eid", "Celebration", "Prayers"],
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60",
    status: "Published",
  },
  {
    id: 3,
    title: "Youth Sports Tournament",
    description: "Action shots from our inter-community sports tournament for children and young adults.",
    author: "Regular Member",
    authorRole: "member",
    date: "2024-03-10",
    category: "Sports Activities",
    tags: ["Sports", "Youth", "Tournament"],
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba821?w=800&auto=format&fit=crop&q=60",
    status: "Published",
  },
];

const CATEGORIES = ["Cultural Events", "Religious Events", "Sports Activities", "Educational Workshops", "Social Gatherings"];

export default function DashboardPortfolioPage() {
  const { user } = useAuth();
  
  // Portfolio State
  const [portfolios, setPortfolios] = useState([]);
  const [isLoadingPortfolios, setIsLoadingPortfolios] = useState(true);

  // Editor Form States
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  
  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Cultural Events");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageMetadata, setImageMetadata] = useState(null);
  const [status, setStatus] = useState("Published");
  const [portfolioDate, setPortfolioDate] = useState("");

  // Filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [myPortfoliosOnly, setMyPortfoliosOnly] = useState(false);

  // Feedback states
  const [notification, setNotification] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Load portfolios from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("abai-portfolios");
    if (saved) {
      try {
        setPortfolios(JSON.parse(saved));
      } catch (e) {
        setPortfolios(SEED_PORTFOLIOS);
      }
    } else {
      setPortfolios(SEED_PORTFOLIOS);
      localStorage.setItem("abai-portfolios", JSON.stringify(SEED_PORTFOLIOS));
    }
    setIsLoadingPortfolios(false);
  }, []);

  // Show auto-dismiss notifications
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // RBAC Perm Check helpers
  const canEdit = (portfolio) => {
    if (!user) return false;
    if (user.role === "admin" || user.role === "moderator") return true;
    if (user.role === "member") {
      return portfolio.author === user.name;
    }
    return false;
  };

  const canDelete = (portfolio) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    if (user.role === "moderator") return false; // Moderators cannot delete
    if (user.role === "member") {
      return portfolio.author === user.name;
    }
    return false;
  };

  // CRUD actions
  const handleDeletePortfolio = (id) => {
    const targetPortfolio = portfolios.find((p) => p.id === id);
    if (!targetPortfolio) return;

    if (!canDelete(targetPortfolio)) {
      showToast(
        `Access Denied: As a ${user?.role || "member"}, you cannot delete this portfolio.`,
        "error"
      );
      return;
    }

    const updated = portfolios.filter((p) => p.id !== id);
    setPortfolios(updated);
    localStorage.setItem("abai-portfolios", JSON.stringify(updated));
    showToast("Portfolio deleted successfully!");
  };

  // Open editor for creating or editing
  const handleOpenEditor = (portfolio = null) => {
    if (portfolio) {
      if (!canEdit(portfolio)) {
        showToast(
          `Access Denied: As a ${user?.role || "member"}, you cannot edit this portfolio.`,
          "error"
        );
        return;
      }
      setEditingPortfolio(portfolio);
      setTitle(portfolio.title);
      setCategory(portfolio.category);
      setDescription(portfolio.description || "");
      setTags(portfolio.tags || []);
      setImageUrl(portfolio.image || "");
      setStatus(portfolio.status || "Published");
      setPortfolioDate(portfolio.date || "");
      setImageMetadata(
        portfolio.image
          ? { name: "current-thumbnail.jpg", size: "Existing", format: "image/jpeg" }
          : null
      );
    } else {
      setEditingPortfolio(null);
      setTitle("");
      setCategory("Cultural Events");
      setDescription("");
      setTags([]);
      setImageUrl("");
      setStatus("Published");
      setPortfolioDate("");
      setImageMetadata(null);
    }
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingPortfolio(null);
  };

  // Tags chip input helpers
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const cleaned = tagInput.trim().replace(/,/g, "");
      if (cleaned && !tags.includes(cleaned)) {
        setTags([...tags, cleaned]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Simulated Drag & Drop image files
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
        setImageUrl(event.target.result);
        setImageMetadata({
          name: file.name,
          size: `${Math.round(file.size / 1024)} KB`,
          format: file.type,
        });
        showToast("Thumbnail uploaded successfully!");
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

  // Format description mockup
  const applyFormat = (formatType) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let replacement = "";
    switch (formatType) {
      case "bold":
        replacement = `**${selectedText || "bold text"}**`;
        break;
      case "italic":
        replacement = `*${selectedText || "italic text"}*`;
        break;
      case "underline":
        replacement = `<u>${selectedText || "underlined text"}</u>`;
        break;
      case "bullet":
        replacement = selectedText
          ? selectedText
              .split("\n")
              .map((line) => `- ${line}`)
              .join("\n")
          : "- List item";
        break;
      case "number":
        replacement = selectedText
          ? selectedText
              .split("\n")
              .map((line, i) => `${i + 1}. ${line}`)
              .join("\n")
          : "1. List item";
        break;
      case "link":
        replacement = `[${selectedText || "link text"}](https://example.com)`;
        break;
      case "image":
        replacement = `![${selectedText || "image description"}](https://images.unsplash.com/photo-1542838132-92c53300491e)`;
        break;
      default:
        return;
    }

    const newValue = text.substring(0, start) + replacement + text.substring(end);
    setDescription(newValue);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + replacement.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 50);
  };

  // Submit Portfolio Form
  const handleSavePortfolio = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Please enter a portfolio title.", "error");
      return;
    }

    if (!portfolioDate) {
      showToast("Please enter a portfolio date.", "error");
      return;
    }

    if (editingPortfolio) {
      // Editing
      const updated = portfolios.map((p) => {
        if (p.id === editingPortfolio.id) {
          return {
            ...p,
            title,
            category,
            description,
            tags,
            image: imageUrl || "https://images.unsplash.com/photo-1508186300540-389e4e244e18?w=800&auto=format&fit=crop&q=60",
            status,
            date: portfolioDate,
          };
        }
        return p;
      });
      setPortfolios(updated);
      localStorage.setItem("abai-portfolios", JSON.stringify(updated));
      showToast("Portfolio updated successfully!");
    } else {
      // Creating
      const newPortfolio = {
        id: Date.now(),
        title,
        description,
        author: user?.name || "Regular Member",
        authorRole: user?.role || "member",
        date: portfolioDate,
        category,
        tags,
        image: imageUrl || "https://images.unsplash.com/photo-1508186300540-389e4e244e18?w=800&auto=format&fit=crop&q=60",
        status,
      };
      const updated = [newPortfolio, ...portfolios];
      setPortfolios(updated);
      localStorage.setItem("abai-portfolios", JSON.stringify(updated));
      showToast("New portfolio published successfully!");
    }
    setIsEditorOpen(false);
  };

  // Filter lists
  const filteredPortfolios = portfolios.filter((portfolio) => {
    const matchesSearch =
      portfolio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portfolio.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portfolio.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || portfolio.category === selectedCategory;

    const matchesAuthor = !myPortfoliosOnly || (user && portfolio.author === user.name);

    return matchesSearch && matchesCategory && matchesAuthor;
  });

  return (
    <ProtectedRoute allowedRoles={["admin", "moderator", "member"]}>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
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

        {/* Dashboard Pages Toggle */}
        <AnimatePresence mode="wait">
          {!isEditorOpen ? (
            /* PORTFOLIO LIST VIEW */
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Header section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    Portfolio Management
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                    Manage photo albums and portfolios for the community.
                  </p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOpenEditor()}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-5 py-3 rounded-2xl font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>New Portfolio</span>
                </motion.button>
              </div>

              {/* Filtering & Search Bar */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative w-full md:max-w-xs">
                  <FiSearch className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search portfolios..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#4b0102] transition-all"
                  />
                </div>

                {/* Filters right side */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                  {/* Category Buttons */}
                  <div className="flex bg-gray-50 dark:bg-gray-900 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-x-auto max-w-full">
                    {["All", ...CATEGORIES].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-white dark:bg-gray-800 text-primary dark:text-white shadow-sm"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* My Portfolios toggle */}
                  <label className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={myPortfoliosOnly}
                      onChange={(e) => setMyPortfoliosOnly(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      My Portfolios
                    </span>
                  </label>
                </div>
              </div>

              {/* Grid List */}
              {isLoadingPortfolios ? (
                <div className="py-24 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm font-semibold">Loading portfolios...</p>
                </div>
              ) : filteredPortfolios.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-3xl py-20 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
                  <FiAlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Portfolios Found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto text-sm">
                    No portfolios match your active search filters or role settings. Try adjusting search queries.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPortfolios.map((portfolio) => {
                    const editable = canEdit(portfolio);
                    const deletable = canDelete(portfolio);

                    return (
                      <motion.div
                        key={portfolio.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
                      >
                        {/* Thumbnail Container */}
                        <div className="relative aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden">
                          {portfolio.image ? (
                            <img
                              src={portfolio.image}
                              alt={portfolio.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <FiImage className="w-12 h-12" />
                            </div>
                          )}
                          
                          {/* Badges overlay */}
                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <span className="px-3 py-1 text-[10px] font-black tracking-wider uppercase rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10">
                              {portfolio.category}
                            </span>
                            {portfolio.status === "Draft" && (
                              <span className="px-3 py-1 text-[10px] font-black tracking-wider uppercase rounded-full bg-amber-600/90 text-white shadow-sm">
                                Draft
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Contents */}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mb-3 font-semibold">
                            <span className="flex items-center gap-1">
                              <FiUser className="w-3.5 h-3.5 text-primary dark:text-[#6b1c23]" />
                              {portfolio.author}
                              <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[9px] uppercase font-black tracking-wide text-zinc-500 dark:text-zinc-300">
                                {portfolio.authorRole || "member"}
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <FiCalendar className="w-3.5 h-3.5" />
                              {portfolio.date}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary dark:group-hover:text-accent transition-colors">
                            {portfolio.title}
                          </h3>

                          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm line-clamp-3 leading-relaxed flex-1">
                            {portfolio.description}
                          </p>

                          {/* Tags preview */}
                          {portfolio.tags && portfolio.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-4">
                              {portfolio.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md flex items-center gap-0.5"
                                >
                                  <FiTag className="w-2.5 h-2.5" />
                                  {tag}
                                </span>
                              ))}
                              {portfolio.tags.length > 3 && (
                                <span className="text-[10px] text-gray-400 font-bold px-1.5 py-0.5">
                                  +{portfolio.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Footer Actions with RBAC details */}
                          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-50 dark:border-gray-700/50">
                            {/* Edit Action */}
                            <button
                              onClick={() => handleOpenEditor(portfolio)}
                              disabled={!editable}
                              className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                editable
                                  ? "bg-slate-50 hover:bg-primary/5 text-slate-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-primary/20 dark:hover:text-white border border-slate-200/50 dark:border-gray-600"
                                  : "bg-gray-100 dark:bg-gray-800/50 text-gray-300 dark:text-gray-600 border border-gray-200/20 cursor-not-allowed opacity-50 relative group/tooltip"
                              }`}
                            >
                              {editable ? (
                                <>
                                  <FiEdit className="w-4.5 h-4.5" />
                                  <span>Edit</span>
                                </>
                              ) : (
                                <>
                                  <FiLock className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                                  <span>Edit Locked</span>
                                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 text-center p-2 bg-gray-900 text-white rounded-xl text-[10px] hidden group-hover/tooltip:block z-20 shadow-xl leading-normal">
                                    Only Admin, Moderator, or Portfolio Author can edit.
                                  </span>
                                </>
                              )}
                            </button>

                            {/* Delete Action */}
                            <button
                              onClick={() => handleDeletePortfolio(portfolio.id)}
                              disabled={!deletable}
                              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center ${
                                deletable
                                  ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/50"
                                  : "border-gray-200/20 bg-gray-100 dark:bg-gray-800/50 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50 relative group/tooltip"
                              }`}
                              title={deletable ? "Delete portfolio" : "Delete locked"}
                            >
                              {deletable ? (
                                <FiTrash2 className="w-4.5 h-4.5" />
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <FiLock className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 text-center p-2 bg-gray-900 text-white rounded-xl text-[10px] hidden group-hover/tooltip:block z-20 shadow-xl leading-normal">
                                    {user?.role === "moderator"
                                      ? "Moderators are not allowed to delete any portfolios."
                                      : "Members can only delete their own portfolios."}
                                  </span>
                                </div>
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ) : (
            /* SPLIT-SCREEN EDITOR VIEW */
            <motion.div
              key="editor-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Editor Navigation Header */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleCloseEditor}
                  className="p-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white shadow-sm cursor-pointer transition-all hover:scale-105"
                >
                  <FiArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                    {editingPortfolio ? "Edit Portfolio" : "Create New Portfolio"}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {editingPortfolio
                      ? `Updating portfolio originally created by ${editingPortfolio.author}`
                      : `Creating as ${user?.name} (${user?.role?.toUpperCase()})`}
                  </p>
                </div>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSavePortfolio} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT SIDE (Main Content - 65% width approx) */}
                <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
                  
                  {/* Portfolio Title Input */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Portfolio Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter an exciting portfolio title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full text-2xl md:text-3xl font-bold py-3 border-b border-gray-100 dark:border-gray-700 outline-none focus:border-primary dark:focus:border-accent bg-transparent text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 transition-colors"
                      required
                    />
                  </div>

                  {/* Date Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    
                    {/* Date Input */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                        Portfolio Date
                      </label>
                      <div className="relative">
                        <FiCalendar className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-4.5 h-4.5" />
                        <input
                          type="date"
                          value={portfolioDate}
                          onChange={(e) => setPortfolioDate(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl pl-10 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                          required
                        />
                      </div>
                    </div>

                    {/* Category Selector */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent appearance-none cursor-pointer"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat} className="bg-white dark:bg-gray-800">
                              {cat}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-4 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-500 w-0 h-0" />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Tags Input */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Add Tags
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Type tag & press Enter or Comma..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl pl-10 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                      />
                      <FiTag className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-4.5 h-4.5" />
                    </div>

                    {/* Render tag chips */}
                    <div className="flex flex-wrap gap-1.5 mt-2 max-h-24 overflow-y-auto pt-1">
                      <AnimatePresence>
                        {tags.map((tag) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="inline-flex items-center gap-1 bg-[#4b0102]/5 dark:bg-gray-900 border border-[#4b0102]/10 dark:border-gray-700 text-[#4b0102] dark:text-accent font-bold px-2.5 py-1 rounded-xl text-xs hover:bg-[#4b0102]/10 dark:hover:bg-gray-800 transition-colors"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors cursor-pointer"
                            >
                              <FiX className="w-3.5 h-3.5" />
                            </button>
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Rich Text Editor Mockup Container */}
                  <div className="space-y-2 pt-2 flex flex-col">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500">
                        Portfolio Description
                      </label>
                      <span className="text-[10px] text-gray-400 font-bold">
                        {description.length} chars | {description.split(/\s+/).filter(Boolean).length} words
                      </span>
                    </div>

                    <div className="border border-slate-200 dark:border-gray-700 rounded-3xl overflow-hidden flex flex-col focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary dark:focus-within:border-accent bg-transparent">
                      {/* Formatted Toolbar */}
                      <div className="bg-slate-50 dark:bg-gray-900/80 px-4 py-3 border-b border-slate-200 dark:border-gray-700 flex flex-wrap items-center gap-1.5">
                        {[
                          { type: "bold", icon: FiBold, tooltip: "Bold" },
                          { type: "italic", icon: FiItalic, tooltip: "Italic" },
                          { type: "underline", icon: FiUnderline, tooltip: "Underline" },
                        ].map((btn) => (
                          <button
                            key={btn.type}
                            type="button"
                            onClick={() => applyFormat(btn.type)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-gray-800 rounded-xl cursor-pointer transition-colors relative group/tool"
                            title={btn.tooltip}
                          >
                            <btn.icon className="w-4 h-4" />
                          </button>
                        ))}
                        <div className="w-px h-5 bg-slate-200 dark:bg-gray-700 mx-1" />
                        {[
                          { type: "bullet", icon: FiList, tooltip: "Bullet List" },
                          { type: "number", icon: FiList, tooltip: "Numbered List" },
                          { type: "link", icon: FiLink, tooltip: "Insert Link" },
                          { type: "image", icon: FiImage, tooltip: "Insert Image URL" },
                        ].map((btn) => (
                          <button
                            key={btn.type}
                            type="button"
                            onClick={() => applyFormat(btn.type)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-gray-800 rounded-xl cursor-pointer transition-colors relative group/tool"
                            title={btn.tooltip}
                          >
                            <btn.icon className="w-4 h-4" />
                            {btn.type === "number" && (
                              <span className="absolute top-1 right-1 text-[8px] font-black scale-75">1.</span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Stateful Editor Textarea */}
                      <textarea
                        ref={textareaRef}
                        placeholder="Write your portfolio description here. You can use the formatting toolbar above to insert markdown helpers (like Bold, Italic, lists and links) directly into your selection..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={12}
                        className="w-full bg-transparent px-5 py-4 text-sm text-gray-800 dark:text-gray-200 outline-none placeholder-gray-400 dark:placeholder-gray-500 resize-y min-h-[200px] leading-relaxed"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE (Sidebar Settings - 35% width approx) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Thumbnail Image Uploader */}
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Thumbnail Image
                    </label>
                    {imageUrl ? (
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                        <img src={imageUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setImageUrl("");
                            setImageMetadata(null);
                          }}
                          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/70 rounded-full text-gray-800 dark:text-white hover:bg-white dark:hover:bg-black/90 transition-colors cursor-pointer"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                          dragActive
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-gray-50 dark:bg-gray-900/50"
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <FiUploadCloud className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {dragActive ? "Drop image here" : "Drag & drop or click to upload"}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                          PNG, JPG, WEBP up to 5MB
                        </p>
                      </div>
                    )}
                    {imageMetadata && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
                        <span className="font-medium">{imageMetadata.name}</span>
                        <span>{imageMetadata.size}</span>
                      </div>
                    )}
                  </div>

                  {/* Status & Publish Controls */}
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Status & Save
                    </label>
                    <div className="space-y-3">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent appearance-none cursor-pointer"
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-5 py-3 rounded-2xl font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
                      >
                        {editingPortfolio ? "Update Portfolio" : "Save & Publish"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ProtectedRoute>
  );
}
