"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import {
  FiArrowUpRight,
  FiCalendar,
  FiCheckCircle,
  FiHeart,
  FiImage,
  FiMessageSquare,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

const STATS = {
  admin: [
    {
      title: "Total Users",
      value: "245",
      change: "+12%",
      icon: FiUsers,
    },
    {
      title: "Upcoming Events",
      value: "8",
      change: "+3",
      icon: FiCalendar,
    },
    {
      title: "Portfolio Items",
      value: "156",
      change: "+8%",
      icon: FiImage,
    },
    {
      title: "Messages",
      value: "23",
      change: "+5",
      icon: FiMessageSquare,
    },
  ],
  moderator: [
    {
      title: "Upcoming Events",
      value: "8",
      change: "+3",
      icon: FiCalendar,
    },
    {
      title: "Portfolio Items",
      value: "156",
      change: "+8%",
      icon: FiImage,
    },
    {
      title: "Messages",
      value: "23",
      change: "+5",
      icon: FiMessageSquare,
    },
  ],
  member: [
    {
      title: "My Events",
      value: "3",
      change: "+1",
      icon: FiCalendar,
    },
    {
      title: "Messages",
      value: "2",
      change: "+1",
      icon: FiMessageSquare,
    },
    {
      title: "Membership Status",
      value: "Active",
      change: "Renew in 30 days",
      icon: FiTrendingUp,
    },
  ],
};

const RECENT_ACTIVITIES = [
  {
    id: 1,
    title: "New event added: Summer Picnic",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "5 new members joined the community",
    time: "Yesterday",
  },
  {
    id: 3,
    title: "Portfolio updated with new photos",
    time: "2 days ago",
  },
  {
    id: 4,
    title: "Executive committee meeting scheduled",
    time: "3 days ago",
  },
];

const QUICK_ACTIONS = [
  { label: "Add Event", icon: FiCalendar },
  { label: "Add Photo", icon: FiImage },
  { label: "Send Message", icon: FiMessageSquare },
  { label: "View Members", icon: FiUsers },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const stats = STATS[user?.role || "member"];

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#191d1c] dark:text-white">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-[#5b6461] dark:text-white/70 mt-3 text-base sm:text-lg">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-[#5b6461] dark:text-white/70">
                {stat.title}
              </p>
              <div className="w-14 h-14 rounded-2xl bg-[#4b0102]/10 flex items-center justify-center text-[#4b0102]">
                <stat.icon className="w-7 h-7" />
              </div>
            </div>
            <div className="text-4xl font-black text-[#191d1c] dark:text-white mb-2">
              {stat.value}
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#4b0102]">
              <FiArrowUpRight className="w-4 h-4" />
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
          <h2 className="text-xl font-black text-[#191d1c] dark:text-white mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {RECENT_ACTIVITIES.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#4b0102]/5 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="w-3 h-3 mt-2 rounded-full bg-[#4b0102]"></div>
                <div className="flex-1">
                  <p className="font-bold text-[#191d1c] dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm text-[#5b6461] dark:text-white/70 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-white to-[#fdf8f3] dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
          <h2 className="text-xl font-black text-[#191d1c] dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {QUICK_ACTIONS.map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#4b0102]/5 hover:bg-[#4b0102]/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#4b0102] flex items-center justify-center text-white mb-3">
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-[#191d1c] dark:text-white">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#4b0102]/10 flex items-center justify-center text-[#4b0102]">
            <FiHeart className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#191d1c] dark:text-white">
            Community Impact
          </h2>
        </div>
        <p className="text-[#5b6461] dark:text-white/70 leading-relaxed mb-6">
          Thank you for being an active part of the ABAI community! Your participation helps us grow stronger together and preserve our cultural heritage in Ireland.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#4b0102]/10 text-[#4b0102] text-sm font-bold">
            <FiCheckCircle className="w-4 h-4" />
            Cultural Events
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#4b0102]/10 text-[#4b0102] text-sm font-bold">
            <FiCheckCircle className="w-4 h-4" />
            Welfare Support
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#4b0102]/10 text-[#4b0102] text-sm font-bold">
            <FiCheckCircle className="w-4 h-4" />
            Community Building
          </span>
        </div>
      </div>
    </div>
  );
}