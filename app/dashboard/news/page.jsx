"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/components/providers/AuthProvider";
import RichTextEditor from "@/components/RichTextEditor";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiEdit,
  FiImage,
  FiLock,
  FiPlus,
  FiSearch,
  FiTag,
  FiTrash2,
  FiUploadCloud,
  FiUser,
  FiX
} from "react-icons/fi";

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

// Default seed news if localStorage is empty
const SEED_NEWS = [
  {
    id: 1,
    title: "ABAI Community Celebrates 10th Anniversary",
    description: "Join us in celebrating a decade of empowering the Bangladeshi diaspora in Ireland.",
    author: "Admin User",
    authorRole: "admin",
    date: "2026-05-20",
    category: "announcement",
    tags: ["anniversary", "celebration", "community"],
    image: "https://images.unsplash.com/photo-1508186300540-389e4e244e18?w=800&auto=format&fit=crop&q=60",
    status: "Published",
  },
  {
    id: 2,
    title: "New Partnership with Dublin City Council",
    description: "We are excited to announce our new partnership with Dublin City Council.",
    author: "Moderator User",
    authorRole: "moderator",
    date: "2026-05-15",
    category: "press",
    tags: ["partnership", "dublin", "council"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
    status: "Published",
  },
  {
    id: 3,
    title: "Summer Festival 2026: Save the Date!",
    description: "Mark your calendars for our biggest event of the year.",
    author: "Regular Member",
    authorRole: "member",
    date: "2026-05-10",
    category: "event",
    tags: ["festival", "summer", "phoenix park"],
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60",
    status: "Published",
  },
];

const CATEGORIES = ["announcement", "press", "update", "event"];

export default function DashboardNewsPage() {
  const { user } = useAuth();

  // News State
  const [news, setNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  // Editor Form States
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("announcement");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageMetadata, setImageMetadata] = useState(null);
  const [status, setStatus] = useState("Published");
  const [newsDate, setNewsDate] = useState("");

  // Filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [myNewsOnly, setMyNewsOnly] = useState(false);

  // Feedback states
  const [notification, setNotification] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);

  // Load news from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("abai-news");
    if (saved) {
      try {
        setNews(JSON.parse(saved));
      } catch (e) {
        setNews(SEED_NEWS);
      }
    } else {
      setNews(SEED_NEWS);
      localStorage.setItem("abai-news", JSON.stringify(SEED_NEWS));
    }
    setIsLoadingNews(false);
  }, []);

  // Show auto-dismiss notifications
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // RBAC Perm Check helpers
  const canEdit = (item) => {
    if (!user) return false;
    if (user.role === "admin" || user.role === "moderator") return true;
    if (user.role === "member") {
      return item.author === user.name;
    }
    return false;
  };

  const canDelete = (item) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    if (user.role === "moderator") return false; // Moderators cannot delete
    if (user.role === "member") {
      return item.author === user.name;
    }
    return false;
  };

  // CRUD actions
  const handleDeleteNews = (id) => {
    const target = news.find((e) => e.id === id);
    if (!target) return;

    if (!canDelete(target)) {
      showToast(
        `Access Denied: As a ${user?.role || "member"}, you cannot delete this news item.`,
        "error"
      );
      return;
    }

    const updated = news.filter((e) => e.id !== id);
    setNews(updated);
    localStorage.setItem("abai-news", JSON.stringify(updated));
    showToast("News item deleted successfully!");
  };

  // Open editor for creating or editing
  const handleOpenEditor = (item = null) => {
    if (item) {
      if (!canEdit(item)) {
        showToast(
          `Access Denied: As a ${user?.role || "member"}, you cannot edit this news item.`,
          "error"
        );
        return;
      }
      setEditingNews(item);
      setTitle(item.title);
      setCategory(item.category);
      setDescription(item.description || "");
      setTags(item.tags || []);
      setImageUrl(item.image || "");
      setStatus(item.status || "Published");
      setNewsDate(item.date || "");
      setImageMetadata(
        item.image
          ? { name: "current-thumbnail.jpg", size: "Existing", format: "image/jpeg" }
          : null
      );
    } else {
      setEditingNews(null);
      setTitle("");
      setCategory("announcement");
      setDescription("");
      setTags([]);
      setImageUrl("");
      setStatus("Published");
      setNewsDate("");
      setImageMetadata(null);
    }
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingNews(null);
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



  // Submit News Form
  const handleSaveNews = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Please enter a news title.", "error");
      return;
    }

    if (!newsDate) {
      showToast("Please enter a news date.", "error");
      return;
    }

    if (editingNews) {
      // Editing
      const updated = news.map((item) => {
        if (item.id === editingNews.id) {
          return {
            ...item,
            title,
            category,
            description,
            tags,
            image: imageUrl || "https://images.unsplash.com/photo-1508186300540-389e4e244e18?w=800&auto=format&fit=crop&q=60",
            status,
            date: newsDate,
          };
        }
        return item;
      });
      setNews(updated);
      localStorage.setItem("abai-news", JSON.stringify(updated));
      showToast("News item updated successfully!");
    } else {
      // Creating
      const newItem = {
        id: Date.now(),
        title,
        description,
        author: user?.name || "Regular Member",
        authorRole: user?.role || "member",
        date: newsDate,
        category,
        tags,
        image: imageUrl || "https://images.unsplash.com/photo-1508186300540-389e4e244e18?w=800&auto=format&fit=crop&q=60",
        status,
      };
      const updated = [newItem, ...news];
      setNews(updated);
      localStorage.setItem("abai-news", JSON.stringify(updated));
      showToast("New news item published successfully!");
    }
    setIsEditorOpen(false);
  };

  const filteredNews = news.filter((item) => {
    const plainTextDesc = getPlainTextFromLexicalJson(item.description);
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plainTextDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesAuthor = !myNewsOnly || (user && item.author === user.name);

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

        {/* Dashboard Pages Toggle */}
        <AnimatePresence mode="wait">
          {!isEditorOpen ? (
            /* NEWS LIST VIEW */
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
                    News Management
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                    Manage community news and updates.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOpenEditor()}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-5 py-3 rounded-lg font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>New News Item</span>
                </motion.button>
              </div>

              {/* Filtering & Search Bar */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative w-full md:max-w-xs">
                  <FiSearch className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#4b0102] transition-all"
                  />
                </div>

                {/* Filters right side */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                  {/* Category Buttons */}
                  <div className="flex bg-gray-50 dark:bg-gray-900 p-1.5 rounded-lg border border-gray-100 dark:border-gray-800 overflow-x-auto max-w-full">
                    {["All", ...CATEGORIES].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${selectedCategory === cat
                          ? "bg-white dark:bg-gray-800 text-primary dark:text-white shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* My News toggle */}
                  <label className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={myNewsOnly}
                      onChange={(e) => setMyNewsOnly(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      My News
                    </span>
                  </label>
                </div>
              </div>

              {/* Grid List */}
              {isLoadingNews ? (
                <div className="py-24 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm font-semibold">Loading news...</p>
                </div>
              ) : filteredNews.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg py-20 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
                  <FiAlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">No News Found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto text-sm">
                    No news items match your active search filters or role settings. Try adjusting search queries.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredNews.map((item) => {
                    const editable = canEdit(item);
                    const deletable = canDelete(item);

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
                      >
                        {/* Thumbnail Container */}
                        <div className="relative aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <FiImage className="w-12 h-12" />
                            </div>
                          )}

                          {/* Badges overlay */}
                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <span className="px-3 py-1 text-[0.65rem] font-black tracking-wider uppercase rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10">
                              {item.category}
                            </span>
                            {item.status === "Draft" && (
                              <span className="px-3 py-1 text-[0.65rem] font-black tracking-wider uppercase rounded-full bg-amber-600/90 text-white shadow-sm">
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
                              {item.author}
                              <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[9px] uppercase font-black tracking-wide text-zinc-500 dark:text-zinc-300">
                                {item.authorRole || "member"}
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <FiCalendar className="w-3.5 h-3.5" />
                              {item.date}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary dark:group-hover:text-accent transition-colors">
                            {item.title}
                          </h3>

                          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm line-clamp-3 leading-relaxed flex-1">
                            {item.description}
                          </p>

                          {/* Tags preview */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-4">
                              {item.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-[0.65rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md flex items-center gap-0.5"
                                >
                                  <FiTag className="w-2.5 h-2.5" />
                                  {tag}
                                </span>
                              ))}
                              {item.tags.length > 3 && (
                                <span className="text-[0.65rem] text-gray-400 font-bold px-1.5 py-0.5">
                                  +{item.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Footer Actions with RBAC details */}
                          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-50 dark:border-gray-700/50">
                            {/* Edit Action */}
                            <button
                              onClick={() => handleOpenEditor(item)}
                              disabled={!editable}
                              className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${editable
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
                                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 text-center p-2 bg-gray-900 text-white rounded-lg text-[0.65rem] hidden group-hover/tooltip:block z-20 shadow-xl leading-normal">
                                    Only Admin, Moderator, or Author can edit.
                                  </span>
                                </>
                              )}
                            </button>

                            {/* Delete Action */}
                            <button
                              onClick={() => handleDeleteNews(item.id)}
                              disabled={!deletable}
                              className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-center ${deletable
                                ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/50"
                                : "border-gray-200/20 bg-gray-100 dark:bg-gray-800/50 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50 relative group/tooltip"
                                }`}
                              title={deletable ? "Delete news" : "Delete locked"}
                            >
                              {deletable ? (
                                <FiTrash2 className="w-4.5 h-4.5" />
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <FiLock className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 text-center p-2 bg-gray-900 text-white rounded-lg text-[0.65rem] hidden group-hover/tooltip:block z-20 shadow-xl leading-normal">
                                    {user?.role === "moderator"
                                      ? "Moderators are not allowed to delete news items."
                                      : "Members can only delete their own items."}
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
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white shadow-sm cursor-pointer transition-all hover:scale-105"
                >
                  <FiArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                    {editingNews ? "Edit News Item" : "Create New News Item"}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {editingNews
                      ? `Updating news item originally created by ${editingNews.author}`
                      : `Creating as ${user?.name} (${user?.role?.toUpperCase()})`}
                  </p>
                </div>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSaveNews} className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* LEFT SIDE (Main Content - 65% width approx) */}
                <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
                  {/* News Title Input */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      News Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter an exciting news title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full text-2xl md:text-3xl font-bold py-3 border-b border-gray-100 dark:border-gray-700 outline-none focus:border-primary dark:focus:border-accent bg-transparent text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 transition-colors"
                      required
                    />
                  </div>

                  {/* Date & Category Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Date Input */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                        News Date
                      </label>
                      <div className="relative">
                        <FiCalendar className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-4.5 h-4.5" />
                        <input
                          type="date"
                          value={newsDate}
                          onChange={(e) => setNewsDate(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
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
                          className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent appearance-none cursor-pointer"
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
                        className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
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
                            className="inline-flex items-center gap-1 bg-[#4b0102]/5 dark:bg-gray-900 border border-[#4b0102]/10 dark:border-gray-700 text-[#4b0102] dark:text-accent font-bold px-2.5 py-1 rounded-lg text-xs hover:bg-[#4b0102]/10 dark:hover:bg-gray-800 transition-colors"
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

                  {/* Rich Text Editor Container */}
                  <div className="space-y-2 pt-2 flex flex-col">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500">
                        News Content
                      </label>
                      <span className="text-[0.65rem] text-gray-400 font-bold">
                        {getPlainTextFromLexicalJson(description).length} chars | {getPlainTextFromLexicalJson(description).split(/\s+/).filter(Boolean).length} words
                      </span>
                    </div>

                    <RichTextEditor
                      key={editingNews ? editingNews.id : "new"}
                      value={description}
                      onChange={setDescription}
                    />
                  </div>
                </div>

                {/* RIGHT SIDE (Sidebar Settings - 35% width approx) */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Thumbnail Image Uploader */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Thumbnail Image
                    </label>
                    {imageUrl ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
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
                        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${dragActive
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
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Status & Save
                    </label>
                    <div className="space-y-3">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent appearance-none cursor-pointer"
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-5 py-3 rounded-lg font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
                      >
                        {editingNews ? "Update News" : "Save & Publish"}
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
