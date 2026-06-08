"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/components/providers/AuthProvider";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCheckCircle,
  FiEdit,
  FiLock,
  FiMail,
  FiPlus,
  FiSearch,
  FiShield,
  FiTrash2,
  FiUploadCloud,
  FiUser,
  FiX
} from "react-icons/fi";

// Default seed members if localStorage is empty
const SEED_MEMBERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "member",
    phone: "+353 83 123 4567",
    address: "123 Main St, Dublin, Ireland",
    joinDate: "2023-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "moderator",
    phone: "+353 87 987 6543",
    address: "456 Oak Ave, Cork, Ireland",
    joinDate: "2023-03-22",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "member",
    phone: "+353 89 456 7890",
    address: "789 Pine Rd, Galway, Ireland",
    joinDate: "2023-06-10",
    status: "Active",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "admin",
    phone: "+353 86 321 0987",
    address: "321 Elm St, Limerick, Ireland",
    joinDate: "2022-11-05",
    status: "Active",
  },
];

const ROLES = ["member", "moderator", "admin"];

export default function DashboardMembersPage() {
  const { user } = useAuth();

  // Member State
  const [members, setMembers] = useState([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);

  // Editor Form States
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Active");
  const [avatar, setAvatar] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  // Feedback states
  const [notification, setNotification] = useState(null);

  // Load members from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("abai-members");
    if (saved) {
      try {
        setMembers(JSON.parse(saved));
      } catch (e) {
        setMembers(SEED_MEMBERS);
      }
    } else {
      setMembers(SEED_MEMBERS);
      localStorage.setItem("abai-members", JSON.stringify(SEED_MEMBERS));
    }
    setIsLoadingMembers(false);
  }, []);

  // Show auto-dismiss notifications
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // CRUD actions
  const handleDeleteMember = (id) => {
    if (id === user?.id || (id === 4 && user?.id !== 4)) {
      showToast("Cannot delete this member!", "error");
      return;
    }

    const updated = members.filter((m) => m.id !== id);
    setMembers(updated);
    localStorage.setItem("abai-members", JSON.stringify(updated));
    showToast("Member deleted successfully!");
  };

  // Open editor for creating or editing
  const handleOpenEditor = (member = null) => {
    if (member) {
      setEditingMember(member);
      setName(member.name);
      setEmail(member.email);
      setRole(member.role);
      setPhone(member.phone || "");
      setAddress(member.address || "");
      setStatus(member.status || "Active");
      setAvatar(member.avatar || "");
    } else {
      setEditingMember(null);
      setName("");
      setEmail("");
      setRole("member");
      setPhone("");
      setAddress("");
      setStatus("Active");
      setAvatar("");
    }
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingMember(null);
    setAvatar("");
  };

  // Avatar file handling
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

  // Submit Member Form
  const handleSaveMember = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Please enter member name.", "error");
      return;
    }
    if (!email.trim()) {
      showToast("Please enter member email.", "error");
      return;
    }

    if (editingMember) {
      // Editing
      const updated = members.map((m) => {
        if (m.id === editingMember.id) {
          return {
            ...m,
            name,
            email,
            role,
            phone,
            address,
            status,
            avatar,
          };
        }
        return m;
      });
      setMembers(updated);
      localStorage.setItem("abai-members", JSON.stringify(updated));
      showToast("Member updated successfully!");
    } else {
      // Creating
      const newMember = {
        id: Date.now(),
        name,
        email,
        role,
        phone,
        address,
        avatar,
        joinDate: new Date().toISOString().split("T")[0],
        status,
      };
      const updated = [newMember, ...members];
      setMembers(updated);
      localStorage.setItem("abai-members", JSON.stringify(updated));
      showToast("New member added successfully!");
    }
    setIsEditorOpen(false);
  };

  // Filter lists
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.phone && member.phone.includes(searchQuery));

    const matchesRole = selectedRole === "All" || member.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-5 max-w-7xl mx-auto pb-12">
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
            /* MEMBER LIST VIEW */
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
                    Members Management
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                    Manage all community members, their roles, and details.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOpenEditor()}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-5 py-3 rounded-lg font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>Add Member</span>
                </motion.button>
              </div>

              {/* Filtering & Search Bar */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative w-full md:max-w-xs">
                  <FiSearch className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#4b0102] transition-all"
                  />
                </div>

                {/* Filters right side */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                  {/* Role Buttons */}
                  <div className="flex bg-gray-50 dark:bg-gray-900 p-1.5 rounded-lg border border-gray-100 dark:border-gray-800 overflow-x-auto max-w-full">
                    {["All", ...ROLES].map((r) => (
                      <button
                        key={r}
                        onClick={() => setSelectedRole(r)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${selectedRole === r
                          ? "bg-white dark:bg-gray-800 text-primary dark:text-white shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          }`}
                      >
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid List */}
              {isLoadingMembers ? (
                <div className="py-24 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm font-semibold">Loading members...</p>
                </div>
              ) : filteredMembers.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg py-20 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
                  <FiAlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Members Found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto text-sm">
                    No members match your active search filters. Try adjusting search queries.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredMembers.map((member) => {
                    return (
                      <motion.div
                        key={member.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group"
                      >
                        {/* Avatar Container */}
                        <div className="p-8 bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
                          {member.avatar ? (
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-24 h-24 rounded-full object-cover mx-auto shadow-lg"
                            />
                          ) : (
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4b0102] to-[#6b1c23] flex items-center justify-center text-white font-black text-4xl mx-auto shadow-lg">
                              {member.name.charAt(0)}
                            </div>
                          )}
                          {/* Badges overlay */}
                          <div className="flex justify-center mt-4 gap-2">
                            <span
                              className={`px-3 py-1 text-[10px] font-black tracking-wider uppercase rounded-full border ${member.role === "admin"
                                ? "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 border-red-200 dark:border-red-900/50"
                                : member.role === "moderator"
                                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border-blue-200 dark:border-blue-900/50"
                                  : "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 border-green-200 dark:border-green-900/50"
                                }`}
                            >
                              {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                            </span>
                            {member.status === "Active" ? (
                              <span className="px-3 py-1 text-[10px] font-black tracking-wider uppercase rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
                                Active
                              </span>
                            ) : (
                              <span className="px-3 py-1 text-[10px] font-black tracking-wider uppercase rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50">
                                {member.status}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Contents */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center leading-tight">
                            {member.name}
                          </h3>

                          <div className="mt-4 space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <FiMail className="w-4 h-4 text-gray-400" />
                              <span className="truncate">{member.email}</span>
                            </div>
                            {member.phone && (
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <FiUser className="w-4 h-4 text-gray-400" />
                                <span>{member.phone}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <FiShield className="w-4 h-4 text-gray-400" />
                              <span>Joined {member.joinDate}</span>
                            </div>
                          </div>

                          {/* Footer Actions */}
                          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-50 dark:border-gray-700/50">
                            {/* View Details Link */}
                            <Link
                              href={`/dashboard/users/${member.id}`}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-slate-50 hover:bg-primary/5 text-slate-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-primary/20 dark:hover:text-white border border-slate-200/50 dark:border-gray-600 transition-all cursor-pointer"
                            >
                              <FiUser className="w-4.5 h-4.5" />
                              <span>Details</span>
                            </Link>

                            {/* Edit Action */}
                            <button
                              onClick={() => handleOpenEditor(member)}
                              className="px-3 py-2 rounded-lg text-xs font-bold bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 border border-slate-200/50 dark:border-gray-600 hover:border-blue-200/50 dark:hover:border-blue-900/50 transition-all cursor-pointer"
                            >
                              <FiEdit className="w-4.5 h-4.5" />
                            </button>

                            {/* Delete Action */}
                            <button
                              onClick={() => handleDeleteMember(member.id)}
                              disabled={member.id === user?.id}
                              className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-center ${member.id === user?.id
                                ? "border-gray-200/20 bg-gray-100 dark:bg-gray-800/50 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50"
                                : "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/50"
                                }`}
                            >
                              {member.id === user?.id ? (
                                <FiLock className="w-4.5 h-4.5" />
                              ) : (
                                <FiTrash2 className="w-4.5 h-4.5" />
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
                    {editingMember ? "Edit Member" : "Add New Member"}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {editingMember
                      ? `Updating details for ${editingMember.name}`
                      : `Adding a new member to the community`}
                  </p>
                </div>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSaveMember} className="max-w-3xl">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
                  {/* Avatar Upload Section */}
                  <div className="space-y-4">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Profile Photo
                    </label>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      {/* Avatar Display */}
                      <div className="flex-shrink-0">
                        {avatar ? (
                          <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg">
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
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4b0102] to-[#6b1c23] flex items-center justify-center text-white font-black text-4xl shadow-lg">
                            {name.charAt(0) || "U"}
                          </div>
                        )}
                      </div>

                      {/* Upload Area */}
                      <div className="flex-1 w-full">
                        <div
                          onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
                          onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
                          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${dragActive
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

                  {/* Member Name Input */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xl font-bold py-3 border-b border-gray-100 dark:border-gray-700 outline-none focus:border-primary dark:focus:border-accent bg-transparent text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 transition-colors"
                      required
                    />
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                        Email Address
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-4.5 h-4.5" />
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                        Phone Number
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-4.5 h-4.5" />
                        <input
                          type="text"
                          placeholder="+353 83 123 4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role & Status Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Role Selector */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                        Role
                      </label>
                      <div className="relative">
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent appearance-none cursor-pointer"
                        >
                          {ROLES.map((r) => (
                            <option key={r} value={r} className="bg-white dark:bg-gray-800">
                              {r.charAt(0).toUpperCase() + r.slice(1)}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-4 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-500 w-0 h-0" />
                      </div>
                    </div>

                    {/* Status Selector */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                        Status
                      </label>
                      <div className="relative">
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent appearance-none cursor-pointer"
                        >
                          {["Active", "Inactive", "Pending"].map((s) => (
                            <option key={s} value={s} className="bg-white dark:bg-gray-800">
                              {s}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-4 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-500 w-0 h-0" />
                      </div>
                    </div>
                  </div>

                  {/* Address Input */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Address
                    </label>
                    <textarea
                      placeholder="123 Main St, Dublin, Ireland"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent resize-none"
                    />
                  </div>

                  {/* Footer Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-50 dark:border-gray-700/50 mt-6">
                    <button
                      type="button"
                      onClick={handleCloseEditor}
                      className="px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-bold transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-6 py-3 rounded-lg font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
                    >
                      {editingMember ? "Update Member" : "Add Member"}
                    </button>
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
