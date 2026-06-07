"use client";

import { useEffect, useRef, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion, AnimatePresence } from "framer-motion";
import { FiUploadCloud, FiX, FiAlertCircle, FiCheckCircle, FiSave, FiUsers, FiPlus, FiEdit, FiTrash2, FiChevronDown } from "react-icons/fi";

const INITIAL_MEMBERS = [
  { id: 1, name: "Member Name", position: "Position", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80" },
  { id: 2, name: "Another Member", position: "Vice President", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" },
];

export default function ExecutiveCommitteePage() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [tempMembers, setTempMembers] = useState(INITIAL_MEMBERS);
  const [notification, setNotification] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const STORAGE_KEY = "abai-executive-committee";

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMembers(parsed);
        setTempMembers(parsed);
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

  const handleSave = () => {
    setMembers(tempMembers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tempMembers));
    showToast("Executive Committee saved successfully!");
  };

  const handleAddMember = () => {
    const newMember = {
      id: Date.now(),
      name: "",
      position: "",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
    };
    setEditingMember(newMember);
    setIsEditModalOpen(true);
  };

  const handleEditMember = (member) => {
    setEditingMember({ ...member });
    setIsEditModalOpen(true);
  };

  const handleDeleteMember = (memberId) => {
    if (confirm("Are you sure you want to delete this member?")) {
      const updated = tempMembers.filter((m) => m.id !== memberId);
      setTempMembers(updated);
      showToast("Member deleted successfully!");
    }
  };

  const saveMember = () => {
    if (!editingMember.name || !editingMember.position) {
      showToast("Please fill in all fields!", "error");
      return;
    }

    let updated;
    const existingIndex = tempMembers.findIndex((m) => m.id === editingMember.id);
    if (existingIndex !== -1) {
      updated = [...tempMembers];
      updated[existingIndex] = editingMember;
    } else {
      updated = [...tempMembers, editingMember];
    }

    setTempMembers(updated);
    setIsEditModalOpen(false);
    setEditingMember(null);
    showToast("Member saved successfully!");
  };

  const processEditFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditingMember({ ...editingMember, image: e.target.result });
        showToast("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Please upload a valid image file!", "error");
    }
  };

  const handleEditDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      processEditFile(e.dataTransfer.files[0]);
    }
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
      <div className="max-w-6xl mx-auto pb-16 space-y-8">
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
              <FiUsers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Executive Committee</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage Executive Committee members</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddMember}
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer"
            >
              <FiPlus className="w-5 h-5" />
              Add Member
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-6 py-3 rounded-2xl font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
            >
              <FiSave className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Members Grid */}
        {tempMembers.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
            <FiUsers className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No members yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Start by adding your first executive committee member</p>
            <button
              onClick={handleAddMember}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-6 py-3 rounded-2xl font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
            >
              <FiPlus className="w-5 h-5" />
              Add First Member
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tempMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm relative group"
              >
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button
                    onClick={() => handleEditMember(member)}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-lg mb-4">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {isEditModalOpen && editingMember && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsEditModalOpen(false)}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              />
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {editingMember.id === Date.now() ? "Add Committee Member" : "Edit Committee Member"}
                  </h2>
                  <button
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingMember(null);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                  >
                    <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Member Photo */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Photo
                    </label>
                    <div className="flex flex-col items-center">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg mb-4">
                        <img src={editingMember.image} alt="Preview" className="w-full h-full object-cover" />
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
                        onDrop={handleEditDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                          dragActive
                            ? "border-[#4b0102] bg-[#4b0102]/5"
                            : "border-gray-200 dark:border-gray-700 hover:border-[#4b0102] hover:bg-[#4b0102]/5 dark:hover:bg-gray-700"
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && processEditFile(e.target.files[0])}
                          className="hidden"
                        />
                        <FiUploadCloud className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Drag and drop or click to select photo
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, WEBP</p>
                      </div>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editingMember.name}
                      onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                      placeholder="Member name"
                    />
                  </div>

                  {/* Position */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Position
                    </label>
                    <input
                      type="text"
                      value={editingMember.position}
                      onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                      placeholder="e.g., President, Secretary"
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                  <button
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingMember(null);
                    }}
                    className="flex-1 px-4 py-3 rounded-2xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveMember}
                    className="flex-1 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] hover:from-[#6b1c23] hover:to-[#8b2c33] text-white px-4 py-3 rounded-2xl font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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