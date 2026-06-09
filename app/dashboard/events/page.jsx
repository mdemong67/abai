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
  FiMapPin,
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

// Default seed events if localStorage is empty
const SEED_EVENTS = [
  {
    id: 1,
    title: "Community Picnic 2024: A Day of Joy",
    description: "Our annual picnic brought together over 200 members of the Bangladeshi community in Dublin for a day filled with delicious food, traditional music, and outdoor sports. It was a wonderful opportunity for families to connect, kids to play traditional games like 'Ha-du-du', and elders to share stories. We look forward to planning next year's event which promises to be even bigger and better!",
    author: "Admin User",
    authorRole: "admin",
    date: "2024-07-20",
    location: "Dublin",
    category: "Community",
    tags: ["Picnic", "Dublin", "Gathering", "Culture"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60",
    status: "Published",
  },
  {
    id: 2,
    title: "Eid Celebration 2024: A Time for Gratitude",
    description: "Celebrating Eid-ul-Fitr with our community members in the heart of Ireland. We hosted a grand banquet sharing special prayers, sweets like Semai, and heartfelt conversations with new diaspora members. The event highlighted the resilience and growth of our community here.",
    author: "Moderator User",
    authorRole: "moderator",
    date: "2024-04-20",
    location: "Cork",
    category: "Religious",
    tags: ["Eid", "Celebration", "Festival", "Faith"],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60",
    status: "Published",
  },
  {
    id: 3,
    title: "Bangladesh Independence Day 2024",
    description: "Celebrating Bangladesh's Independence Day with cultural events, flag hoisting, and patriotic songs. Community members of all ages participated to honor our heritage and history.",
    author: "Regular Member",
    authorRole: "member",
    date: "2024-03-26",
    location: "Galway",
    category: "Cultural",
    tags: ["Independence", "Bangladesh", "Patriotic"],
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=60",
    status: "Published",
  },
];

const CATEGORIES = ["Community", "Cultural", "Religious", "Sports", "Educational"];

export default function DashboardEventsPage() {
  const { user } = useAuth();

  // Event State
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  // Editor Form States
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Community");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageMetadata, setImageMetadata] = useState(null);
  const [status, setStatus] = useState("Published");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  // Filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [myEventsOnly, setMyEventsOnly] = useState(false);

  // Feedback states
  const [notification, setNotification] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);

  // Load events from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("abai-events");
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch (e) {
        setEvents(SEED_EVENTS);
      }
    } else {
      setEvents(SEED_EVENTS);
      localStorage.setItem("abai-events", JSON.stringify(SEED_EVENTS));
    }
    setIsLoadingEvents(false);
  }, []);

  // Show auto-dismiss notifications
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // RBAC Perm Check helpers
  const canEdit = (event) => {
    if (!user) return false;
    if (user.role === "admin" || user.role === "moderator") return true;
    if (user.role === "member") {
      return event.author === user.name;
    }
    return false;
  };

  const canDelete = (event) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    if (user.role === "moderator") return false; // Moderators cannot delete
    if (user.role === "member") {
      return event.author === user.name;
    }
    return false;
  };

  // CRUD actions
  const handleDeleteEvent = (id) => {
    const targetEvent = events.find((e) => e.id === id);
    if (!targetEvent) return;

    if (!canDelete(targetEvent)) {
      showToast(
        `Access Denied: As a ${user?.role || "member"}, you cannot delete this event.`,
        "error"
      );
      return;
    }

    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    localStorage.setItem("abai-events", JSON.stringify(updated));
    showToast("Event deleted successfully!");
  };

  // Open editor for creating or editing
  const handleOpenEditor = (event = null) => {
    if (event) {
      if (!canEdit(event)) {
        showToast(
          `Access Denied: As a ${user?.role || "member"}, you cannot edit this event.`,
          "error"
        );
        return;
      }
      setEditingEvent(event);
      setTitle(event.title);
      setCategory(event.category);
      setDescription(event.description || "");
      setTags(event.tags || []);
      setImageUrl(event.image || "");
      setStatus(event.status || "Published");
      setEventDate(event.date || "");
      setEventLocation(event.location || "");
      setImageMetadata(
        event.image
          ? { name: "current-thumbnail.jpg", size: "Existing", format: "image/jpeg" }
          : null
      );
    } else {
      setEditingEvent(null);
      setTitle("");
      setCategory("Community");
      setDescription("");
      setTags([]);
      setImageUrl("");
      setStatus("Published");
      setEventDate("");
      setEventLocation("");
      setImageMetadata(null);
    }
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingEvent(null);
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



  // Submit Event Form
  const handleSaveEvent = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      showToast("Please enter an event title.", "error");
      return;
    }

    if (!eventDate) {
      showToast("Please enter an event date.", "error");
      return;
    }

    if (!eventLocation.trim()) {
      showToast("Please enter an event location.", "error");
      return;
    }

    if (editingEvent) {
      // Editing
      const updated = events.map((e) => {
        if (e.id === editingEvent.id) {
          return {
            ...e,
            title,
            category,
            description,
            tags,
            image: imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60",
            status,
            date: eventDate,
            location: eventLocation,
          };
        }
        return e;
      });
      setEvents(updated);
      localStorage.setItem("abai-events", JSON.stringify(updated));
      showToast("Event updated successfully!");
    } else {
      // Creating
      const newEvent = {
        id: Date.now(),
        title,
        description,
        author: user?.name || "Regular Member",
        authorRole: user?.role || "member",
        date: eventDate,
        location: eventLocation,
        category,
        tags,
        image: imageUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60",
        status,
      };
      const updated = [newEvent, ...events];
      setEvents(updated);
      localStorage.setItem("abai-events", JSON.stringify(updated));
      showToast("New event published successfully!");
    }
    setIsEditorOpen(false);
  };

  // Filter lists
  const filteredEvents = events.filter((event) => {
    const plainTextDesc = getPlainTextFromLexicalJson(event.description);
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plainTextDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;

    const matchesAuthor = !myEventsOnly || (user && event.author === user.name);

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
            /* EVENT LIST VIEW */
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
                    Events Management
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                    Manage community events for the diaspora.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOpenEditor()}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-5 py-3 rounded-lg font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>New Event</span>
                </motion.button>
              </div>

              {/* Filtering & Search Bar */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative w-full md:max-w-xs">
                  <FiSearch className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search events..."
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

                  {/* My Events toggle */}
                  <label className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={myEventsOnly}
                      onChange={(e) => setMyEventsOnly(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      My Events
                    </span>
                  </label>
                </div>
              </div>

              {/* Grid List */}
              {isLoadingEvents ? (
                <div className="py-24 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm font-semibold">Loading events...</p>
                </div>
              ) : filteredEvents.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg py-20 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
                  <FiAlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Events Found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto text-sm">
                    No events match your active search filters or role settings. Try adjusting search queries.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents.map((event) => {
                    const editable = canEdit(event);
                    const deletable = canDelete(event);

                    return (
                      <motion.div
                        key={event.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
                      >
                        {/* Thumbnail Container */}
                        <div className="relative aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden">
                          {event.image ? (
                            <img
                              src={event.image}
                              alt={event.title}
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
                              {event.category}
                            </span>
                            {event.status === "Draft" && (
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
                              {event.author}
                              <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[9px] uppercase font-black tracking-wide text-zinc-500 dark:text-zinc-300">
                                {event.authorRole || "member"}
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <FiCalendar className="w-3.5 h-3.5" />
                              {event.date}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary dark:group-hover:text-accent transition-colors">
                            {event.title}
                          </h3>

                          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm line-clamp-3 leading-relaxed flex-1">
                            {event.description}
                          </p>

                          {/* Location */}
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 flex items-center gap-1">
                            <FiMapPin className="w-3.5 h-3.5" />
                            {event.location}
                          </p>

                          {/* Tags preview */}
                          {event.tags && event.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-4">
                              {event.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md flex items-center gap-0.5"
                                >
                                  <FiTag className="w-2.5 h-2.5" />
                                  {tag}
                                </span>
                              ))}
                              {event.tags.length > 3 && (
                                <span className="text-[10px] text-gray-400 font-bold px-1.5 py-0.5">
                                  +{event.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Footer Actions with RBAC details */}
                          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-50 dark:border-gray-700/50">
                            {/* Edit Action */}
                            <button
                              onClick={() => handleOpenEditor(event)}
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
                                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 text-center p-2 bg-gray-900 text-white rounded-lg text-[10px] hidden group-hover/tooltip:block z-20 shadow-xl leading-normal">
                                    Only Admin, Moderator, or Event Author can edit.
                                  </span>
                                </>
                              )}
                            </button>

                            {/* Delete Action */}
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              disabled={!deletable}
                              className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-center ${deletable
                                ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/50"
                                : "border-gray-200/20 bg-gray-100 dark:bg-gray-800/50 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50 relative group/tooltip"
                                }`}
                              title={deletable ? "Delete event" : "Delete locked"}
                            >
                              {deletable ? (
                                <FiTrash2 className="w-4.5 h-4.5" />
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <FiLock className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 text-center p-2 bg-gray-900 text-white rounded-lg text-[10px] hidden group-hover/tooltip:block z-20 shadow-xl leading-normal">
                                    {user?.role === "moderator"
                                      ? "Moderators are not allowed to delete any events."
                                      : "Members can only delete their own events."}
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
                    {editingEvent ? "Edit Event" : "Create New Event"}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {editingEvent
                      ? `Updating community event originally created by ${editingEvent.author}`
                      : `Creating as ${user?.name} (${user?.role?.toUpperCase()})`}
                  </p>
                </div>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSaveEvent} className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                {/* LEFT SIDE (Main Content - 65% width approx) */}
                <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">

                  {/* Event Title Input */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Event Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter an exciting event title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full text-2xl md:text-3xl font-bold py-3 border-b border-gray-100 dark:border-gray-700 outline-none focus:border-primary dark:focus:border-accent bg-transparent text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 transition-colors"
                      required
                    />
                  </div>

                  {/* Location & Date Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">

                    {/* Location Input */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                        Event Location
                      </label>
                      <div className="relative">
                        <FiMapPin className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-4.5 h-4.5" />
                        <input
                          type="text"
                          placeholder="Dublin, Ireland..."
                          value={eventLocation}
                          onChange={(e) => setEventLocation(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                          required
                        />
                      </div>
                    </div>

                    {/* Date Input */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                        Event Date
                      </label>
                      <div className="relative">
                        <FiCalendar className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-4.5 h-4.5" />
                        <input
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                          required
                        />
                      </div>
                    </div>
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
                  </div>

                  {/* Rich Text Editor Container */}
                  <div className="space-y-2 pt-2 flex flex-col">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500">
                        Event Description
                      </label>
                      <span className="text-[10px] text-gray-400 font-bold">
                        {getPlainTextFromLexicalJson(description).length} chars | {getPlainTextFromLexicalJson(description).split(/\s+/).filter(Boolean).length} words
                      </span>
                    </div>

                    <RichTextEditor
                      key={editingEvent ? editingEvent.id : "new"}
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
                        {editingEvent ? "Update Event" : "Save & Publish"}
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
