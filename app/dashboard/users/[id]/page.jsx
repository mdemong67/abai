"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/components/providers/AuthProvider";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiEdit,
  FiHome,
  FiLock,
  FiMail,
  FiPhone,
  FiTrash2,
  FiUser,
  FiX
} from "react-icons/fi";

// Default seed members (same as the page)
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

export default function MemberDetailsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const memberId = Number(params.id);

  // Member State
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Load member data
  useEffect(() => {
    const saved = localStorage.getItem("abai-members");
    let members = [];
    if (saved) {
      try {
        members = JSON.parse(saved);
      } catch (e) {
        members = SEED_MEMBERS;
      }
    } else {
      members = SEED_MEMBERS;
    }
    const foundMember = members.find((m) => m.id === memberId);
    setMember(foundMember);
    setIsLoading(false);
  }, [memberId]);

  // Show auto-dismiss notifications
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleDelete = () => {
    if (memberId === user?.id) {
      showToast("Cannot delete your own account!", "error");
      return;
    }

    const saved = localStorage.getItem("abai-members");
    let members = saved ? JSON.parse(saved) : SEED_MEMBERS;
    members = members.filter((m) => m.id !== memberId);
    localStorage.setItem("abai-members", JSON.stringify(members));
    showToast("Member deleted successfully!");
    setTimeout(() => {
      router.push("/dashboard/users");
    }, 1500);
  };

  if (isLoading) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="py-24 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm font-semibold">Loading member details...</p>
        </div>
      </ProtectedRoute>
    );
  }

  if (!member) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="py-24 text-center">
          <FiAlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Member Not Found</h3>
          <button
            onClick={() => router.push("/dashboard/users")}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-[#4b0102] to-[#6b1c23] text-white rounded-2xl font-bold"
          >
            Back to Members
          </button>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="max-w-4xl mx-auto pb-12">
        {/* Floating Notification */}
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

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/dashboard/users")}
            className="p-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white shadow-sm cursor-pointer transition-all hover:scale-105"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {member.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Member Details
            </p>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Member Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#4b0102] to-[#6b1c23] flex items-center justify-center text-white font-black text-6xl mx-auto shadow-lg">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 w-full">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span
                    className={`px-4 py-1.5 text-xs font-black tracking-wider uppercase rounded-full border ${member.role === "admin"
                        ? "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 border-red-200 dark:border-red-900/50"
                        : member.role === "moderator"
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border-blue-200 dark:border-blue-900/50"
                          : "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 border-green-200 dark:border-green-900/50"
                      }`}
                  >
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </span>
                  {member.status === "Active" ? (
                    <span className="px-4 py-1.5 text-xs font-black tracking-wider uppercase rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
                      Active
                    </span>
                  ) : (
                    <span className="px-4 py-1.5 text-xs font-black tracking-wider uppercase rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50">
                      {member.status}
                    </span>
                  )}
                </div>

                <div className="grid gap-6">
                  {/* Name */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500">
                      <FiUser />
                      <span>Full Name</span>
                    </div>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {member.name}
                    </p>
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500">
                        <FiMail />
                        <span>Email</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {member.email}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500">
                        <FiPhone />
                        <span>Phone</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {member.phone || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500">
                      <FiHome />
                      <span>Address</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {member.address || "-"}
                    </p>
                  </div>

                  {/* Join Date */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500">
                      <FiCalendar />
                      <span>Join Date</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {member.joinDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-50 dark:border-gray-700/50">
              <button
                onClick={() => router.push("/dashboard/users")}
                className="px-6 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-bold transition-all cursor-pointer"
              >
                Back to Members
              </button>

              <button
                onClick={() => router.push(`/dashboard/users?edit=${member.id}`)}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 border border-slate-200/50 dark:border-gray-600 hover:border-blue-200/50 dark:hover:border-blue-900/50 text-sm font-bold transition-all cursor-pointer"
              >
                <FiEdit className="w-4.5 h-4.5" />
                Edit Member
              </button>

              <button
                onClick={handleDelete}
                disabled={memberId === user?.id}
                className={`px-6 py-3 rounded-2xl text-sm font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${memberId === user?.id
                    ? "border-gray-200/20 bg-gray-100 dark:bg-gray-800/50 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50"
                    : "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/50"
                  }`}
              >
                {memberId === user?.id ? (
                  <>
                    <FiLock className="w-4.5 h-4.5" />
                    Cannot Delete
                  </>
                ) : (
                  <>
                    <FiTrash2 className="w-4.5 h-4.5" />
                    Delete Member
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
