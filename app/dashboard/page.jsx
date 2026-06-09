"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useSite } from "@/components/providers/SiteProvider";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  FiArrowUpRight,
  FiCalendar,
  FiCheckCircle,
  FiDollarSign,
  FiHeart,
  FiImage,
  FiMessageSquare,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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

const generateMockDonations = () => {
  const now = new Date();
  const donations = [];
  const names = [
    "Fatima Begum", "Mohammed Rahman", "Kazi Iqbal", "Tariq Anam", 
    "Sultana Kamal", "Niaz Morshed", "Syed Badrul", "Zahanara Alam",
    "Tamim Iqbal", "Shakib Al Hasan", "Mashrafe Mortaza", "Mushfiqur Rahim"
  ];
  
  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  const addDonationsForDate = (date, count) => {
    for (let i = 0; i < count; i++) {
      const amount = randomItem([10, 25, 50, 100, 250, 500]);
      const d = new Date(date);
      d.setHours(Math.floor(Math.random() * 24));
      d.setMinutes(Math.floor(Math.random() * 60));
      donations.push({
        id: `don_${d.getTime()}_${Math.random().toString(36).substr(2, 5)}`,
        amount,
        donorName: randomItem(names),
        timestamp: d.getTime(),
        type: Math.random() > 0.3 ? "one-time" : "monthly"
      });
    }
  };
  
  // Today
  const today = new Date(now);
  addDonationsForDate(today, 8);
  
  // Yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  addDonationsForDate(yesterday, 6);
  
  // Past week (excluding today/yesterday)
  for (let i = 2; i < 7; i++) {
    const day = new Date(now);
    day.setDate(now.getDate() - i);
    addDonationsForDate(day, Math.floor(Math.random() * 3) + 1);
  }
  
  // Past month (excluding past week)
  for (let i = 7; i < 30; i++) {
    const day = new Date(now);
    day.setDate(now.getDate() - i);
    if (Math.random() > 0.4) {
      addDonationsForDate(day, Math.floor(Math.random() * 2) + 1);
    }
  }
  
  // Past year (excluding past month)
  for (let i = 30; i < 365; i += 5) {
    const day = new Date(now);
    day.setDate(now.getDate() - i);
    addDonationsForDate(day, Math.floor(Math.random() * 3) + 1);
  }
  
  return donations.sort((a, b) => a.timestamp - b.timestamp);
};

const filterDonations = (donations, filterRange) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;
  const endOfYesterday = startOfToday - 1;
  const startOfLast2Days = startOfYesterday;
  const startOfLastWeek = now.getTime() - 7 * 24 * 60 * 60 * 1000;
  const startOfLastMonth = now.getTime() - 30 * 24 * 60 * 60 * 1000;
  const startOfLast6Months = now.getTime() - 180 * 24 * 60 * 60 * 1000;
  const startOfLastYear = now.getTime() - 365 * 24 * 60 * 60 * 1000;

  switch (filterRange) {
    case "today":
      return donations.filter(d => d.timestamp >= startOfToday);
    case "yesterday":
      return donations.filter(d => d.timestamp >= startOfYesterday && d.timestamp <= endOfYesterday);
    case "last-2-days":
      return donations.filter(d => d.timestamp >= startOfLast2Days);
    case "last-week":
      return donations.filter(d => d.timestamp >= startOfLastWeek);
    case "last-month":
      return donations.filter(d => d.timestamp >= startOfLastMonth);
    case "last-6-months":
      return donations.filter(d => d.timestamp >= startOfLast6Months);
    case "last-year":
      return donations.filter(d => d.timestamp >= startOfLastYear);
    default:
      return donations;
  }
};

const groupDonations = (filtered, filterRange) => {
  const map = {};

  if (filterRange === "today" || filterRange === "yesterday") {
    const hours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
    hours.forEach(h => {
      const label = `${h.toString().padStart(2, "0")}:00`;
      map[label] = 0;
    });

    filtered.forEach(d => {
      const date = new Date(d.timestamp);
      const hour = date.getHours();
      const block = hours.reduce((prev, curr) => (hour >= curr ? curr : prev), 0);
      const label = `${block.toString().padStart(2, "0")}:00`;
      map[label] = (map[label] || 0) + d.amount;
    });
  } else if (filterRange === "last-2-days") {
    const now = new Date();
    const todayLabel = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const yesterdayLabel = yesterday.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    map[yesterdayLabel] = 0;
    map[todayLabel] = 0;

    filtered.forEach(d => {
      const label = new Date(d.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (label === todayLabel || label === yesterdayLabel) {
        map[label] = (map[label] || 0) + d.amount;
      }
    });
  } else if (filterRange === "last-week") {
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      map[label] = 0;
    }

    filtered.forEach(d => {
      const label = new Date(d.timestamp).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      if (map[label] !== undefined) {
        map[label] += d.amount;
      }
    });
  } else if (filterRange === "last-month") {
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      map[label] = 0;
    }

    filtered.forEach(d => {
      const label = new Date(d.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (map[label] !== undefined) {
        map[label] += d.amount;
      }
    });
  } else if (filterRange === "last-6-months") {
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const label = d.toLocaleDateString("en-US", { month: "short" });
      map[label] = 0;
    }

    filtered.forEach(d => {
      const label = new Date(d.timestamp).toLocaleDateString("en-US", { month: "short" });
      if (map[label] !== undefined) {
        map[label] += d.amount;
      }
    });
  } else if (filterRange === "last-year") {
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const label = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      map[label] = 0;
    }

    filtered.forEach(d => {
      const label = new Date(d.timestamp).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      if (map[label] !== undefined) {
        map[label] += d.amount;
      }
    });
  }

  const categories = Object.keys(map);
  const data = Object.values(map);

  return { categories, data };
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { dark } = useSite();
  const stats = STATS[user?.role || "member"];
  const [donations, setDonations] = useState([]);
  const [filterRange, setFilterRange] = useState("last-month");

  useEffect(() => {
    const saved = localStorage.getItem("abai-donations");
    if (saved) {
      try {
        setDonations(JSON.parse(saved));
      } catch (e) {
        const seed = generateMockDonations();
        setDonations(seed);
        localStorage.setItem("abai-donations", JSON.stringify(seed));
      }
    } else {
      const seed = generateMockDonations();
      setDonations(seed);
      localStorage.setItem("abai-donations", JSON.stringify(seed));
    }
  }, []);

  const filteredDonations = filterDonations(donations, filterRange);
  const chartData = groupDonations(filteredDonations, filterRange);

  const totalAmount = filteredDonations.reduce((sum, d) => sum + d.amount, 0);
  const count = filteredDonations.length;
  const averageAmount = count > 0 ? totalAmount / count : 0;

  return (
    <div className="space-y-5">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-[#5b6461] dark:text-white/70">
                {stat.title}
              </p>
              <div className="w-14 h-14 rounded-lg bg-[#4b0102]/10 flex items-center justify-center text-[#4b0102]">
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

      {/* Donation Analysis Chart - Admin Only */}
      {user?.role === "admin" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#4b0102]/10 flex items-center justify-center text-[#4b0102]">
                <FiDollarSign className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#191d1c] dark:text-white">
                  Donations Analysis
                </h2>
                <p className="text-xs text-[#5b6461] dark:text-white/70 mt-0.5">
                  Monitor donor transaction history and trends
                </p>
              </div>
            </div>
            {/* Filter buttons */}
            <div className="flex bg-gray-50 dark:bg-gray-900 p-1 rounded-lg border border-gray-100 dark:border-gray-800 overflow-x-auto max-w-full">
              {[
                { label: "Today", value: "today" },
                { label: "Yesterday", value: "yesterday" },
                { label: "Last 2 Days", value: "last-2-days" },
                { label: "Last Week", value: "last-week" },
                { label: "Last Month", value: "last-month" },
                { label: "Last 6 Months", value: "last-6-months" },
                { label: "Last Year", value: "last-year" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilterRange(item.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    filterRange === item.value
                      ? "bg-white dark:bg-gray-800 text-[#4b0102] dark:text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50/50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-100/50 dark:border-gray-700/50">
            <div className="p-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                Total Donation Amount
              </p>
              <p className="text-2xl font-black text-[#4b0102] dark:text-white mt-1">
                €{totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="p-2 border-t sm:border-t-0 sm:border-l border-gray-200/50 dark:border-gray-700/50">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                Number of Donations
              </p>
              <p className="text-2xl font-black text-gray-800 dark:text-gray-200 mt-1">
                {count}
              </p>
            </div>
            <div className="p-2 border-t sm:border-t-0 sm:border-l border-gray-200/50 dark:border-gray-700/50">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                Average Donation
              </p>
              <p className="text-2xl font-black text-gray-800 dark:text-gray-200 mt-1">
                €{averageAmount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Chart Wrapper */}
          <div className="min-h-[300px] w-full bg-white dark:bg-gray-900/10 rounded-xl p-2">
            {chartData.categories.length > 0 && (
              <Chart
                options={{
                  chart: {
                    id: "donation-chart",
                    animations: { enabled: false },
                    toolbar: { show: false },
                    background: "transparent",
                    foreColor: dark ? "#9ca3af" : "#4b5563",
                  },
                  xaxis: {
                    categories: chartData.categories,
                    labels: {
                      rotate: -45,
                      style: {
                        fontSize: "11px",
                        fontFamily: "Inter, sans-serif",
                      }
                    }
                  },
                  yaxis: {
                    labels: {
                      formatter: (val) => `€${val.toFixed(0)}`,
                      style: {
                        fontSize: "11px",
                        fontFamily: "Inter, sans-serif",
                      }
                    }
                  },
                  colors: ["#4b0102"],
                  stroke: {
                    curve: "smooth",
                    width: 3,
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shadeIntensity: 1,
                      opacityFrom: 0.45,
                      opacityTo: 0.05,
                      stops: [0, 90, 100]
                    }
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  tooltip: {
                    theme: dark ? "dark" : "light",
                    y: {
                      formatter: (val) => `€${val.toFixed(2)}`,
                    }
                  },
                  grid: {
                    borderColor: dark ? "#374151" : "#e5e7eb",
                    strokeDashArray: 4,
                  }
                }}
                series={[
                  {
                    name: "Donations (€)",
                    data: chartData.data,
                  }
                ]}
                type="area"
                height={350}
              />
            )}
          </div>
        </div>
      )}

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
          <h2 className="text-xl font-black text-[#191d1c] dark:text-white mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {RECENT_ACTIVITIES.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#4b0102]/5 dark:hover:bg-gray-700 transition-colors duration-200"
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
        <div className="bg-gradient-to-br from-white to-[#fdf8f3] dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
          <h2 className="text-xl font-black text-[#191d1c] dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {QUICK_ACTIONS.map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center justify-center p-6 rounded-lg bg-[#4b0102]/5 hover:bg-[#4b0102]/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#4b0102] flex items-center justify-center text-white mb-3">
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
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#4b0102]/10 flex items-center justify-center text-[#4b0102]">
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