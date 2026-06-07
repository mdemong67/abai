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
} from "react-icons/fi";

// Default seed blogs if localStorage is empty
const SEED_BLOGS = [
  {
    id: 1,
    title: "Community Picnic 2024: A Day of Joy",
    excerpt: "Our annual picnic brought together over 200 members of the Bangladeshi community in Dublin for a day filled with delicious food, traditional music, and outdoor sports.",
    description: "Our annual picnic brought together over 200 members of the Bangladeshi community in Dublin for a day filled with delicious food, traditional music, and outdoor sports. It was a wonderful opportunity for families to connect, kids to play traditional games like 'Ha-du-du', and elders to share stories. We look forward to planning next year's event which promises to be even bigger and better!",
    author: "Admin User",
    authorRole: "admin",
    date: "2024-05-15",
    category: "Community",
    tags: ["Picnic", "Dublin", "Gathering", "Culture"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60",
    status: "Published",
  },
  {
    id: 2,
    title: "Eid Celebration 2024: A Time for Gratitude",
    excerpt: "Celebrating Eid-ul-Fitr with our community members, sharing special prayers, sweets, and heartfelt conversations with new diaspora members.",
    description: "Celebrating Eid-ul-Fitr with our community members in the heart of Ireland. We hosted a grand banquet sharing special prayers, sweets like Semai, and heartfelt conversations with new diaspora members. The event highlighted the resilience and growth of our community here.",
    author: "Moderator User",
    authorRole: "moderator",
    date: "2024-04-20",
    category: "Culture",
    tags: ["Eid", "Celebration", "Festival", "Faith"],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60",
    status: "Published",
  },
  {
    id: 3,
    title: "Bangla Language School: Enrollment Open",
    excerpt: "We are excited to announce that admissions are now open for the next semester of our Bangla Language & Heritage class for children.",
    description: "We are excited to announce that admissions are now open for the next semester of our Bangla Language & Heritage class for children. Classes are held every Saturday at our community center. Teach your children their native tongue, literature, and history from qualified volunteer teachers.",
    author: "Regular Member",
    authorRole: "member",
    date: "2024-03-10",
    category: "Announcement",
    tags: ["Language", "Education", "Youth", "Enrollment"],
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=60",
    status: "Published",
  },
];

const CATEGORIES = ["Community", "Culture", "Announcement", "News"];

export default function DashboardBlogPage() {
  const { user } = useAuth();
  
  // Blog State
  const [blogs, setBlogs] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);

  // Editor Form States
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  
  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Community");
  const [excerpt, setExcerpt] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageMetadata, setImageMetadata] = useState(null);
  const [status, setStatus] = useState("Published");

  // Filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [myPostsOnly, setMyPostsOnly] = useState(false);

  // Feedback states
  const [notification, setNotification] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Load blogs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("abai-blogs");
    if (saved) {
      try {
        setBlogs(JSON.parse(saved));
      } catch (e) {
        setBlogs(SEED_BLOGS);
      }
    } else {
      setBlogs(SEED_BLOGS);
      localStorage.setItem("abai-blogs", JSON.stringify(SEED_BLOGS));
    }
    setIsLoadingBlogs(false);
  }, []);

  // Show auto-dismiss notifications
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // RBAC Perm Check helpers
  const canEdit = (blog) => {
    if (!user) return false;
    if (user.role === "admin" || user.role === "moderator") return true;
    if (user.role === "member") {
      return blog.author === user.name;
    }
    return false;
  };

  const canDelete = (blog) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    if (user.role === "moderator") return false; // Moderators cannot delete
    if (user.role === "member") {
      return blog.author === user.name;
    }
    return false;
  };

  // CRUD actions
  const handleDeleteBlog = (id) => {
    const targetBlog = blogs.find((b) => b.id === id);
    if (!targetBlog) return;

    if (!canDelete(targetBlog)) {
      showToast(
        `Access Denied: As a ${user?.role || "member"}, you cannot delete this post.`,
        "error"
      );
      return;
    }

    const updated = blogs.filter((b) => b.id !== id);
    setBlogs(updated);
    localStorage.setItem("abai-blogs", JSON.stringify(updated));
    showToast("Post deleted successfully!");
  };

  // Open editor for creating or editing
  const handleOpenEditor = (blog = null) => {
    if (blog) {
      if (!canEdit(blog)) {
        showToast(
          `Access Denied: As a ${user?.role || "member"}, you cannot edit this post.`,
          "error"
        );
        return;
      }
      setEditingBlog(blog);
      setTitle(blog.title);
      setCategory(blog.category);
      setExcerpt(blog.excerpt);
      setDescription(blog.description || "");
      setTags(blog.tags || []);
      setImageUrl(blog.image || "");
      setStatus(blog.status || "Published");
      setImageMetadata(
        blog.image
          ? { name: "current-thumbnail.jpg", size: "Existing", format: "image/jpeg" }
          : null
      );
    } else {
      setEditingBlog(null);
      setTitle("");
      setCategory("Community");
      setExcerpt("");
      setDescription("");
      setTags([]);
      setImageUrl("");
      setStatus("Published");
      setImageMetadata(null);
    }
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingBlog(null);
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

  // Submit Blog Form
  const handleSaveBlog = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      showToast("Please enter a blog title.", "error");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const generatedExcerpt = excerpt.trim() || description.substring(0, 120) + "...";

    if (editingBlog) {
      // Editing
      const updated = blogs.map((b) => {
        if (b.id === editingBlog.id) {
          return {
            ...b,
            title,
            category,
            excerpt: generatedExcerpt,
            description,
            tags,
            image: imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60",
            status,
          };
        }
        return b;
      });
      setBlogs(updated);
      localStorage.setItem("abai-blogs", JSON.stringify(updated));
      showToast("Post updated successfully!");
    } else {
      // Creating
      const newPost = {
        id: Date.now(),
        title,
        excerpt: generatedExcerpt,
        description,
        author: user?.name || "Regular Member",
        authorRole: user?.role || "member",
        date: today,
        category,
        tags,
        image: imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60",
        status,
      };
      const updated = [newPost, ...blogs];
      setBlogs(updated);
      localStorage.setItem("abai-blogs", JSON.stringify(updated));
      showToast("New post published successfully!");
    }
    setIsEditorOpen(false);
  };

  // Filter lists
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    const matchesAuthor = !myPostsOnly || (user && blog.author === user.name);

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
            /* BLOG LIST VIEW */
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
                    Blog Management
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                    Publish and manage blog posts for the diaspora community.
                  </p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOpenEditor()}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-5 py-3 rounded-2xl font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>New Post</span>
                </motion.button>
              </div>

              {/* Filtering & Search Bar */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative w-full md:max-w-xs">
                  <FiSearch className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search posts..."
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

                  {/* My Posts toggle */}
                  <label className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={myPostsOnly}
                      onChange={(e) => setMyPostsOnly(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      My Posts
                    </span>
                  </label>
                </div>
              </div>

              {/* Grid List */}
              {isLoadingBlogs ? (
                <div className="py-24 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm font-semibold">Loading blogs...</p>
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-3xl py-20 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
                  <FiAlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Posts Found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto text-sm">
                    No articles match your active search filters or role settings. Try adjusting search queries.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredBlogs.map((blog) => {
                    const editable = canEdit(blog);
                    const deletable = canDelete(blog);

                    return (
                      <motion.div
                        key={blog.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
                      >
                        {/* Thumbnail Container */}
                        <div className="relative aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden">
                          {blog.image ? (
                            <img
                              src={blog.image}
                              alt={blog.title}
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
                              {blog.category}
                            </span>
                            {blog.status === "Draft" && (
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
                              {blog.author}
                              <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[9px] uppercase font-black tracking-wide text-zinc-500 dark:text-zinc-300">
                                {blog.authorRole || "member"}
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <FiCalendar className="w-3.5 h-3.5" />
                              {blog.date}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary dark:group-hover:text-accent transition-colors">
                            {blog.title}
                          </h3>

                          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm line-clamp-3 leading-relaxed flex-1">
                            {blog.excerpt}
                          </p>

                          {/* Tags preview */}
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-4">
                              {blog.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md flex items-center gap-0.5"
                                >
                                  <FiTag className="w-2.5 h-2.5" />
                                  {tag}
                                </span>
                              ))}
                              {blog.tags.length > 3 && (
                                <span className="text-[10px] text-gray-400 font-bold px-1.5 py-0.5">
                                  +{blog.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Footer Actions with RBAC details */}
                          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-50 dark:border-gray-700/50">
                            {/* Edit Action */}
                            <button
                              onClick={() => handleOpenEditor(blog)}
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
                                    Only Admin, Moderator, or Post Author can edit.
                                  </span>
                                </>
                              )}
                            </button>

                            {/* Delete Action */}
                            <button
                              onClick={() => handleDeleteBlog(blog.id)}
                              disabled={!deletable}
                              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center ${
                                deletable
                                  ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/50"
                                  : "border-gray-200/20 bg-gray-100 dark:bg-gray-800/50 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50 relative group/tooltip"
                              }`}
                              title={deletable ? "Delete post" : "Delete locked"}
                            >
                              {deletable ? (
                                <FiTrash2 className="w-4.5 h-4.5" />
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <FiLock className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 text-center p-2 bg-gray-900 text-white rounded-xl text-[10px] hidden group-hover/tooltip:block z-20 shadow-xl leading-normal">
                                    {user?.role === "moderator"
                                      ? "Moderators are not allowed to delete any posts."
                                      : "Members can only delete their own posts."}
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
                    {editingBlog ? "Edit Blog Post" : "Create New Blog"}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {editingBlog
                      ? `Updating community blog originally written by ${editingBlog.author}`
                      : `Writing as ${user?.name} (${user?.role?.toUpperCase()})`}
                  </p>
                </div>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSaveBlog} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT SIDE (Main Content - 65% width approx) */}
                <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
                  
                  {/* Blog Title Input */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter a captivating, clear blog title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full text-2xl md:text-3xl font-bold py-3 border-b border-gray-100 dark:border-gray-700 outline-none focus:border-primary dark:focus:border-accent bg-transparent text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 transition-colors"
                      required
                    />
                  </div>

                  {/* Category & Tags Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    
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

                    {/* Interactive Tags Input */}
                    <div className="space-y-2">
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
                  </div>

                  {/* Excerpt Input */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Short Excerpt (Brief Summary)
                    </label>
                    <textarea
                      placeholder="Brief excerpt summarizing the article (optional, auto-generated from text if left blank)..."
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent placeholder-gray-400 resize-none"
                    />
                  </div>

                  {/* Rich Text Editor Mockup Container */}
                  <div className="space-y-2 pt-2 flex flex-col">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500">
                        Blog Content Description
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
                          { type: "number", icon: FiList, tooltip: "Numbered List" }, // Renders standard list icon, we simulation label inside
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
                        placeholder="Write your article stories here. You can use the formatting toolbar above to insert markdown helpers (like Bold, Italic, lists and links) directly into your selection..."
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

                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current.click()}
                      className={`relative min-h-[180px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-300 ${
                        dragActive
                          ? "border-primary bg-primary/5 dark:border-accent dark:bg-accent/5"
                          : imageUrl
                          ? "border-emerald-300 bg-slate-50 dark:bg-gray-900/20 border-solid"
                          : "border-slate-200 hover:border-primary/40 dark:border-gray-700 dark:hover:border-accent/40 bg-slate-50/50 dark:bg-gray-900/10"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {imageUrl ? (
                        <div className="w-full space-y-3">
                          <div className="relative aspect-video rounded-xl overflow-hidden shadow-inner border border-gray-100 dark:border-gray-800">
                            <img
                              src={imageUrl}
                              alt="Thumbnail preview"
                              className="w-full h-full object-cover"
                            />
                            {/* Overlay remove btn */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setImageUrl("");
                                setImageMetadata(null);
                              }}
                              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow"
                              title="Remove image"
                            >
                              <FiX className="w-4.5 h-4.5" />
                            </button>
                          </div>

                          {imageMetadata && (
                            <div className="text-[11px] text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-950 p-2.5 rounded-xl border border-gray-100 dark:border-gray-900 text-left space-y-1">
                              <p className="font-bold truncate text-gray-700 dark:text-gray-300">
                                {imageMetadata.name}
                              </p>
                              <div className="flex justify-between font-medium">
                                <span>Size: {imageMetadata.size}</span>
                                <span className="uppercase">{imageMetadata.format?.split("/")[1] || "jpeg"}</span>
                              </div>
                            </div>
                          )}

                          <button
                            type="button"
                            className="text-xs font-black text-[#4b0102] dark:text-accent hover:underline flex items-center justify-center gap-1 mx-auto mt-1"
                          >
                            Replace Image
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2 pointer-events-none">
                          <div className="mx-auto w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow border border-gray-100 dark:border-gray-700 text-gray-400">
                            <FiUploadCloud className="w-6 h-6" />
                          </div>
                          <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
                            Drag & drop image, or <span className="text-[#4b0102] dark:text-accent underline">browse</span>
                          </div>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500">
                            Supports PNG, JPG, WEBP formats. Max file size: 5MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Settings Box */}
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Publish Settings
                    </label>

                    {/* Status selection */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block">
                        Visibility Status
                      </label>
                      <div className="flex bg-slate-50 dark:bg-gray-900 p-1 rounded-2xl border border-slate-100 dark:border-gray-800">
                        {["Published", "Draft"].map((st) => {
                          const isSel = status === st;
                          return (
                            <button
                              key={st}
                              type="button"
                              onClick={() => setStatus(st)}
                              className={`flex-1 py-2.5 text-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
                                isSel
                                  ? "bg-white dark:bg-gray-800 text-primary dark:text-white shadow-sm"
                                  : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                              }`}
                            >
                              {st}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Policy Card info based on Role */}
                    <div className="p-3.5 bg-gradient-to-r from-slate-50 to-zinc-50 dark:from-slate-950/20 dark:to-zinc-950/20 border border-slate-100 dark:border-gray-800 rounded-2xl space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-black text-gray-700 dark:text-gray-300">
                        <FiLock className="w-3.5 h-3.5 text-accent" />
                        <span>Role Protection Rules</span>
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal">
                        {user?.role === "admin"
                          ? "As an Admin, you are posting with root permissions. This blog will be fully editable and deletable."
                          : user?.role === "moderator"
                          ? "As a Moderator, you can edit this and other posts, but you will not have permission to delete it or other articles."
                          : "As a Member, you have owned access. You can edit and delete this post, but you cannot edit or delete posts belonging to others."}
                      </p>
                    </div>
                  </div>

                  {/* Actions Drawer */}
                  <div className="space-y-3 pt-2">
                    {/* Publish Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white rounded-2xl font-bold shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                    >
                      <FiEye className="w-4.5 h-4.5" />
                      <span>{editingBlog ? "Update Post" : "Publish Post"}</span>
                    </motion.button>

                    {/* Cancel Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleCloseEditor}
                      className="w-full py-3.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-slate-200 dark:border-gray-700 rounded-2xl font-bold transition-all hover:bg-slate-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2 cursor-pointer text-sm"
                    >
                      Cancel & Exit
                    </motion.button>
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
