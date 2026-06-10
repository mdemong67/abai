"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiFilter,
  FiHeart,
  FiPlus,
  FiSearch,
  FiTrendingUp,
  FiUsers,
  FiX,
  FiXCircle,
} from "react-icons/fi";

const INITIAL_DONATIONS = [
  {
    id: "TXN-1082",
    donor: "Mohammad Ali",
    email: "m.ali@gmail.com",
    date: "2026-06-08",
    campaign: "Flood Relief 2026",
    method: "Stripe (Card)",
    amount: 150,
    status: "Completed",
  },
  {
    id: "TXN-1081",
    donor: "Sarah Connor",
    email: "sarah.c@outlook.com",
    date: "2026-06-07",
    campaign: "General Welfare Fund",
    method: "PayPal",
    amount: 50,
    status: "Completed",
  },
  {
    id: "TXN-1080",
    donor: "Dr. Md Jinnuraine Jaigirdar",
    email: "president@abai.ie",
    date: "2026-06-06",
    campaign: "General Welfare Fund",
    method: "Bank Transfer",
    amount: 1000,
    status: "Completed",
  },
  {
    id: "TXN-1079",
    donor: "Imran Khan",
    email: "imran.k@yahoo.com",
    date: "2026-06-05",
    campaign: "Cultural Center Project",
    method: "Stripe (Card)",
    amount: 250,
    status: "Pending",
  },
  {
    id: "TXN-1078",
    donor: "Rahim Uddin",
    email: "rahim.u@abai.ie",
    date: "2026-06-04",
    campaign: "Flood Relief 2026",
    method: "Stripe (Card)",
    amount: 100,
    status: "Completed",
  },
  {
    id: "TXN-1077",
    donor: "Jessica Alba",
    email: "jessica.a@gmail.com",
    date: "2026-06-02",
    campaign: "General Welfare Fund",
    method: "PayPal",
    amount: 75,
    status: "Failed",
  },
  {
    id: "TXN-1076",
    donor: "Zakir Hossain",
    email: "zakir.h@hotmail.com",
    date: "2026-05-28",
    campaign: "Cultural Center Project",
    method: "Bank Transfer",
    amount: 500,
    status: "Completed",
  },
  {
    id: "TXN-1075",
    donor: "Nadia Islam",
    email: "nadia.i@gmail.com",
    date: "2026-05-25",
    campaign: "Flood Relief 2026",
    method: "Stripe (Card)",
    amount: 200,
    status: "Completed",
  }
];

export default function DonationHistoryPage() {
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [notification, setNotification] = useState(null);
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Form inputs state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formCampaign, setFormCampaign] = useState("General Welfare Fund");
  const [formMethod, setFormMethod] = useState("Bank Transfer");
  const [formStatus, setFormStatus] = useState("Completed");

  // Load additional dynamic state if saved in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("abai-donations-history");
    if (saved) {
      try {
        setDonations(JSON.parse(saved));
      } catch (e) {
        // Fallback to initial seed
      }
    }
  }, []);

  const saveDonations = (newList) => {
    setDonations(newList);
    localStorage.setItem("abai-donations-history", JSON.stringify(newList));
  };

  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Filter donations
  const filteredDonations = donations.filter((item) => {
    const matchesSearch =
      item.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCampaign =
      selectedCampaign === "all" || item.campaign === selectedCampaign;
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesCampaign && matchesStatus;
  });

  // Calculate statistics based on currently stored donations
  const totalReceived = donations
    .filter((d) => d.status === "Completed")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalDonors = new Set(donations.map((d) => d.email.toLowerCase())).size;

  const averageDonation = donations.filter((d) => d.status === "Completed").length
    ? Math.round(totalReceived / donations.filter((d) => d.status === "Completed").length)
    : 0;

  const pendingDonationsCount = donations.filter((d) => d.status === "Pending").length;

  // Handle manual donation entry submission
  const handleAddDonation = (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formAmount) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    const amountNum = parseFloat(formAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      showToast("Amount must be a positive number.", "error");
      return;
    }

    const newDonation = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      donor: formName,
      email: formEmail,
      date: new Date().toISOString().split("T")[0],
      campaign: formCampaign,
      method: formMethod,
      amount: amountNum,
      status: formStatus,
    };

    const updated = [newDonation, ...donations];
    saveDonations(updated);
    
    // Reset inputs
    setFormName("");
    setFormEmail("");
    setFormAmount("");
    setFormCampaign("General Welfare Fund");
    setFormMethod("Bank Transfer");
    setFormStatus("Completed");
    
    setIsAddModalOpen(false);
    showToast("Manual donation recorded successfully!");
  };

  // Handle Export to CSV
  const handleExportCSV = () => {
    if (filteredDonations.length === 0) {
      showToast("No donation history available to export.", "error");
      return;
    }

    const headers = "Transaction ID,Donor Name,Email,Date,Campaign,Payment Method,Amount (€),Status\n";
    const csvContent = filteredDonations
      .map(
        (d) =>
          `"${d.id}","${d.donor.replace(/"/g, '""')}","${d.email}","${d.date}","${d.campaign.replace(/"/g, '""')}","${d.method}","${d.amount}","${d.status}"`
      )
      .join("\n");

    const blob = new Blob([headers + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ABAI_Donation_History_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("CSV report generated and downloaded successfully.");
  };

  // Helper status color mapper
  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20";
      case "Pending":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
      case "Failed":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
    }
  };

  // Helper status icon mapper
  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FiCheckCircle className="w-3.5 h-3.5" />;
      case "Pending":
        return <FiClock className="w-3.5 h-3.5" />;
      case "Failed":
        return <FiXCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-8 w-full mx-auto pb-16">
        {/* Floating Toast Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-lg shadow-2xl border text-white max-w-md ${
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
                className="ml-auto hover:bg-white/10 p-1 rounded-lg transition-all duration-150"
              >
                <FiX className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Donation History
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Review and record all community donations and campaign contributions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200 px-5 py-3 rounded-xl font-bold shadow-sm transition-all cursor-pointer"
            >
              <FiDownload className="w-4.5 h-4.5" />
              Export CSV
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#4b0102] hover:bg-[#6c151c] text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-[#4b0102]/25 transition-all cursor-pointer"
            >
              <FiPlus className="w-4.5 h-4.5" />
              Record Donation
            </button>
          </div>
        </div>

        {/* High-Fidelity Stats Panel */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Total Raised
              </span>
              <p className="text-2xl font-black text-gray-950 dark:text-white">
                €{totalReceived.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <FiHeart className="w-6 h-6 fill-current" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Unique Donors
              </span>
              <p className="text-2xl font-black text-gray-950 dark:text-white">
                {totalDonors}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#4b0102]/10 text-[#4b0102] dark:text-[#f3b5ba] flex items-center justify-center">
              <FiUsers className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Avg. Donation
              </span>
              <p className="text-2xl font-black text-gray-950 dark:text-white">
                €{averageDonation}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Pending Audits
              </span>
              <p className="text-2xl font-black text-gray-950 dark:text-white">
                {pendingDonationsCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FiClock className="w-6 h-6 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search donor, email, transaction..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
            />
          </div>

          {/* Selector filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Campaign Select */}
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-400 dark:text-gray-500 w-4 h-4 shrink-0" />
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="all">All Campaigns</option>
                <option value="General Welfare Fund">General Welfare Fund</option>
                <option value="Flood Relief 2026">Flood Relief 2026</option>
                <option value="Cultural Center Project">Cultural Center Project</option>
              </select>
            </div>

            {/* Status Select */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
          <p>
            Showing {filteredDonations.length} of {donations.length} transactions
          </p>
        </div>

        {/* Donations List / Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 bg-slate-50/50 dark:bg-gray-900/30 text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500">
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Donor</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Campaign</th>
                  <th className="px-6 py-4">Payment Method</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50 text-sm">
                {filteredDonations.length > 0 ? (
                  filteredDonations.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/40 dark:hover:bg-gray-700/20 transition-colors"
                    >
                      <td className="px-6 py-4.5 font-bold text-gray-900 dark:text-white">
                        {item.id}
                      </td>
                      <td className="px-6 py-4.5">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 dark:text-white">
                            {item.donor}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {item.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 text-gray-600 dark:text-gray-400 font-medium">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4.5">
                        <span className="inline-flex rounded-full bg-slate-100 dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
                          {item.campaign}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 text-gray-500 dark:text-gray-400 font-medium">
                        {item.method}
                      </td>
                      <td className="px-6 py-4.5 font-black text-gray-950 dark:text-white">
                        €{item.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4.5 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${getStatusStyle(
                            item.status
                          )}`}
                        >
                          {getStatusIcon(item.status)}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <button
                          onClick={() => setSelectedDonation(item)}
                          className="text-xs font-bold text-[#4b0102] dark:text-[#f3b5ba] hover:underline cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <FiAlertCircle className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        No transactions found
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Try modifying your search query or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Record Manual Donation */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">
                    Record Manual Donation
                  </h3>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white transition-all cursor-pointer"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddDonation} className="p-6 space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Donor Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john.doe@email.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                        Amount (€) *
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        required
                        placeholder="e.g. 100"
                        value={formAmount}
                        onChange={(e) => setFormAmount(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                        Payment Method
                      </label>
                      <select
                        value={formMethod}
                        onChange={(e) => setFormMethod(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent cursor-pointer"
                      >
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cash">Cash</option>
                        <option value="Check">Check</option>
                        <option value="Stripe (Card)">Stripe (Card)</option>
                        <option value="PayPal">PayPal</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Campaign / Cause
                    </label>
                    <select
                      value={formCampaign}
                      onChange={(e) => setFormCampaign(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent cursor-pointer"
                    >
                      <option value="General Welfare Fund">General Welfare Fund</option>
                      <option value="Flood Relief 2026">Flood Relief 2026</option>
                      <option value="Cultural Center Project">Cultural Center Project</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block">
                      Status
                    </label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent cursor-pointer"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>

                  <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2.5 text-sm font-semibold border border-gray-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-sm font-bold bg-[#4b0102] hover:bg-[#6c151c] text-white rounded-lg shadow-md transition-all cursor-pointer"
                    >
                      Record Transaction
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: View Donation Details */}
        <AnimatePresence>
          {selectedDonation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedDonation(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">
                    Transaction Receipt
                  </h3>
                  <button
                    onClick={() => setSelectedDonation(null)}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white transition-all cursor-pointer"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Amount Hero */}
                  <div className="text-center py-4 bg-slate-50 dark:bg-gray-900/30 rounded-2xl border border-slate-100 dark:border-gray-700/50">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Amount Contributed
                    </p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">
                      €{selectedDonation.amount.toLocaleString()}
                    </p>
                    <span
                      className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold ${getStatusStyle(
                        selectedDonation.status
                      )}`}
                    >
                      {getStatusIcon(selectedDonation.status)}
                      {selectedDonation.status}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between py-1 border-b border-slate-50 dark:border-gray-700/40">
                      <span className="font-semibold text-gray-400 dark:text-gray-500">
                        Transaction ID
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {selectedDonation.id}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-50 dark:border-gray-700/40">
                      <span className="font-semibold text-gray-400 dark:text-gray-500">
                        Donor Name
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {selectedDonation.donor}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-50 dark:border-gray-700/40">
                      <span className="font-semibold text-gray-400 dark:text-gray-500">
                        Email Address
                      </span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {selectedDonation.email}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-50 dark:border-gray-700/40">
                      <span className="font-semibold text-gray-400 dark:text-gray-500">
                        Date Recorded
                      </span>
                      <span className="font-bold text-gray-700 dark:text-gray-300">
                        {new Date(selectedDonation.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-50 dark:border-gray-700/40">
                      <span className="font-semibold text-gray-400 dark:text-gray-500">
                        Campaign Cause
                      </span>
                      <span className="font-bold text-[#4b0102] dark:text-[#f3b5ba]">
                        {selectedDonation.campaign}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-50 dark:border-gray-700/40">
                      <span className="font-semibold text-gray-400 dark:text-gray-500">
                        Payment Method
                      </span>
                      <span className="font-bold text-gray-700 dark:text-gray-300">
                        {selectedDonation.method}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setSelectedDonation(null)}
                      className="w-full py-3 text-sm font-bold bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-650 text-gray-700 dark:text-gray-200 rounded-xl transition-all cursor-pointer"
                    >
                      Close Receipt
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </ProtectedRoute>
  );
}
