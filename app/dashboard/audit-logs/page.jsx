"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiActivity,
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiFilter,
  FiInfo,
  FiKey,
  FiRefreshCw,
  FiSearch,
  FiSettings,
  FiShield,
  FiTrash2,
  FiUserCheck,
  FiX,
} from "react-icons/fi";

const INITIAL_LOGS = [
  {
    id: "LOG-5921",
    timestamp: "2026-06-10T14:45:22.000Z",
    action: "Site Settings Updated",
    module: "Settings",
    operator: "Dr. Md Jinnuraine Jaigirdar",
    email: "president@abai.ie",
    ip: "193.12.5.42",
    severity: "Info",
    details: "Updated Hero Banner Title and primary call-to-action link.",
  },
  {
    id: "LOG-5920",
    timestamp: "2026-06-10T14:12:05.000Z",
    action: "Manual Donation Recorded",
    module: "Donations",
    operator: "Dr. Md Jinnuraine Jaigirdar",
    email: "president@abai.ie",
    ip: "193.12.5.42",
    severity: "Info",
    details: "Recorded offline bank transfer of €1,000 from Dr. Md Jinnuraine Jaigirdar.",
  },
  {
    id: "LOG-5919",
    timestamp: "2026-06-10T12:02:18.000Z",
    action: "Failed Login Attempt",
    module: "Auth",
    operator: "System Alert",
    email: "unknown-operator@abai.ie",
    ip: "82.16.20.104",
    severity: "Warning",
    details: "3 consecutive failed password attempts for user account: admin@abai.ie.",
  },
  {
    id: "LOG-5918",
    timestamp: "2026-06-09T18:30:00.000Z",
    action: "News Article Published",
    module: "Content",
    operator: "Iqbal Mahmud",
    email: "secretary@abai.ie",
    ip: "109.255.4.11",
    severity: "Info",
    details: "Published news article titled 'ABAI Elections 2026: Announcement and Verification Timelines'.",
  },
  {
    id: "LOG-5917",
    timestamp: "2026-06-09T10:15:43.000Z",
    action: "Membership Request Approved",
    module: "Members",
    operator: "Iqbal Mahmud",
    email: "secretary@abai.ie",
    ip: "109.255.4.11",
    severity: "Info",
    details: "Approved membership registration application for Sarah Connor (UID: MEM-4902).",
  },
  {
    id: "LOG-5916",
    timestamp: "2026-06-08T09:04:12.000Z",
    action: "User Password Reset Forced",
    module: "Auth",
    operator: "System Security",
    email: "security@abai.ie",
    ip: "127.0.0.1",
    severity: "Critical",
    details: "Forced admin-initiated password expiration for operator: test@abai.ie due to inactivity.",
  },
  {
    id: "LOG-5915",
    timestamp: "2026-06-07T16:22:11.000Z",
    action: "Member Rejected",
    module: "Members",
    operator: "Dr. Md Jinnuraine Jaigirdar",
    email: "president@abai.ie",
    ip: "193.12.5.42",
    severity: "Warning",
    details: "Rejected membership registration request for user email: fraud.test@spam.com due to unverified ID proof.",
  },
  {
    id: "LOG-5914",
    timestamp: "2026-06-06T11:10:05.000Z",
    action: "Stripe Webhook Synced",
    module: "Donations",
    operator: "Stripe Integration",
    email: "stripe-api@abai.ie",
    ip: "3.18.12.94",
    severity: "Info",
    details: "Successfully processed charge.succeeded webhook event. Received €150 contribution from Mohammad Ali.",
  }
];

export default function AuditLogsPage() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [notification, setNotification] = useState(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("abai-audit-logs");
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  const saveLogs = (newList) => {
    setLogs(newList);
    localStorage.setItem("abai-audit-logs", JSON.stringify(newList));
  };

  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Refresh simulation
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Audit logs successfully reloaded and synchronized.");
    }, 800);
  };

  // Clear Logs Simulation (Resets to seed data or empty)
  const handleClearLogs = () => {
    if (confirm("Are you sure you want to clear system audit logs? This action is recorded and audited.")) {
      const systemClearLog = {
        id: `LOG-${Math.floor(6000 + Math.random() * 999)}`,
        timestamp: new Date().toISOString(),
        action: "Audit Trail Cleared",
        module: "Settings",
        operator: "Dr. Md Jinnuraine Jaigirdar",
        email: "president@abai.ie",
        ip: "193.12.5.42",
        severity: "Critical",
        details: "Administrator cleared log history cache. Master ledger reset performed.",
      };
      
      const resetList = [systemClearLog];
      saveLogs(resetList);
      showToast("Audit trail cleared. Clear action logged in registry.", "error");
    }
  };

  // Export Audit Logs to CSV
  const handleExportCSV = () => {
    if (filteredLogs.length === 0) {
      showToast("No log records available to export.", "error");
      return;
    }

    const headers = "Timestamp,Log ID,Action,Module,Operator,Operator Email,IP Address,Severity,Details\n";
    const csvContent = filteredLogs
      .map(
        (l) =>
          `"${new Date(l.timestamp).toLocaleString()}","${l.id}","${l.action.replace(/"/g, '""')}","${l.module}","${l.operator.replace(/"/g, '""')}","${l.email}","${l.ip}","${l.severity}","${l.details.replace(/"/g, '""')}"`
      )
      .join("\n");

    const blob = new Blob([headers + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ABAI_Audit_Logs_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("CSV report generated and downloaded successfully.");
  };

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesModule = selectedModule === "all" || log.module === selectedModule;
    const matchesSeverity = selectedSeverity === "all" || log.severity === selectedSeverity;
    
    return matchesSearch && matchesModule && matchesSeverity;
  });

  // Calculate statistics
  const totalEvents = filteredLogs.length;
  const criticalCount = logs.filter((l) => l.severity === "Critical").length;
  const warningCount = logs.filter((l) => l.severity === "Warning").length;

  // Severity color badge style helpers
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
      case "Warning":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
      case "Info":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
    }
  };

  // Module icon mapper
  const getModuleIcon = (module) => {
    switch (module) {
      case "Auth":
        return <FiKey className="w-4 h-4 text-purple-500" />;
      case "Members":
        return <FiUserCheck className="w-4 h-4 text-emerald-500" />;
      case "Donations":
        return <FiActivity className="w-4 h-4 text-rose-500" />;
      case "Settings":
        return <FiSettings className="w-4 h-4 text-blue-500" />;
      default:
        return <FiInfo className="w-4 h-4 text-gray-500" />;
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
              System Audit Logging
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Cryptographically secure log records tracking operations, authentications, and state edits.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200 px-4 py-3 rounded-xl font-bold shadow-sm transition-all cursor-pointer"
            >
              <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Sync Logs
            </button>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200 px-4 py-3 rounded-xl font-bold shadow-sm transition-all cursor-pointer"
            >
              <FiDownload className="w-4 h-4" />
              Export Logs
            </button>
            <button
              onClick={handleClearLogs}
              className="inline-flex items-center justify-center gap-2 bg-red-650 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-bold shadow-md shadow-red-500/10 transition-all cursor-pointer"
            >
              <FiTrash2 className="w-4 h-4" />
              Clear Log History
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Total Events Count
              </span>
              <p className="text-2xl font-black text-gray-950 dark:text-white">
                {totalEvents}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <FiActivity className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Critical Exceptions
              </span>
              <p className="text-2xl font-black text-gray-950 dark:text-white">
                {criticalCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
              <FiAlertCircle className="w-6 h-6 text-red-500 animate-bounce" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Warning Flags
              </span>
              <p className="text-2xl font-black text-gray-950 dark:text-white">
                {warningCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FiAlertTriangle className="w-6 h-6 text-amber-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                System Status
              </span>
              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                100% Secure Ledger
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <FiShield className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search logs by action, email, details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-accent"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Module */}
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-400 dark:text-gray-500 w-4 h-4 shrink-0" />
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="all">All Modules</option>
                <option value="Auth">Auth & Sessions</option>
                <option value="Members">Members Admin</option>
                <option value="Donations">Donation System</option>
                <option value="Content">Content Management</option>
                <option value="Settings">System Settings</option>
              </select>
            </div>

            {/* Filter Severity */}
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              <option value="all">All Severities</option>
              <option value="Info">Info</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 bg-slate-50/50 dark:bg-gray-900/30 text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500">
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Log ID</th>
                  <th className="px-6 py-4">Event / Action</th>
                  <th className="px-6 py-4">Module</th>
                  <th className="px-6 py-4">Operator</th>
                  <th className="px-6 py-4 text-center">IP Address</th>
                  <th className="px-6 py-4 text-center">Severity</th>
                  <th className="px-6 py-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50 text-sm">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/40 dark:hover:bg-gray-700/20 transition-colors"
                    >
                      <td className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {new Date(item.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-xs text-gray-900 dark:text-white">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white whitespace-nowrap">
                        {item.action}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 font-semibold text-xs text-gray-700 dark:text-gray-300">
                          {getModuleIcon(item.module)}
                          {item.module}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 dark:text-white">
                            {item.operator}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {item.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-xs text-gray-500 dark:text-gray-400">
                        {item.ip}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold ${getSeverityStyle(
                            item.severity
                          )}`}
                        >
                          {item.severity === "Critical" && (
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                          )}
                          {item.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedLog(item)}
                          className="text-xs font-bold text-[#4b0102] dark:text-[#f3b5ba] hover:underline cursor-pointer"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <FiAlertCircle className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        No logs match search filters
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Try reset search input, or select another module/severity filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: View Log Details payload */}
        <AnimatePresence>
          {selectedLog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLog(null)}
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
                    Audit Event Payload
                  </h3>
                  <button
                    onClick={() => setSelectedLog(null)}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white transition-all cursor-pointer"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Event summary header */}
                  <div className="p-4 bg-slate-50 dark:bg-gray-900/30 rounded-2xl border border-slate-100 dark:border-gray-700/50 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-[#4b0102] dark:text-[#f3b5ba]">
                      {getModuleIcon(selectedLog.module)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gray-950 dark:text-white leading-snug">
                        {selectedLog.action}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Log Entry ID: {selectedLog.id}
                      </p>
                    </div>
                  </div>

                  {/* Details Data block */}
                  <div className="space-y-3.5 text-sm">
                    <div>
                      <span className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block mb-1">
                        Severity Classification
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold ${getSeverityStyle(
                          selectedLog.severity
                        )}`}
                      >
                        {selectedLog.severity}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block mb-1">
                        Timestamp (ISO)
                      </span>
                      <span className="font-mono text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {selectedLog.timestamp}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block mb-1">
                          Operator
                        </span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">
                          {selectedLog.operator}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block mb-1">
                          Operator Email
                        </span>
                        <span className="font-semibold text-gray-750 dark:text-gray-300 break-all text-xs">
                          {selectedLog.email}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block mb-1">
                          Subsystem Module
                        </span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">
                          {selectedLog.module}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block mb-1">
                          Terminal IP Address
                        </span>
                        <span className="font-mono text-xs font-bold text-gray-800 dark:text-gray-250">
                          {selectedLog.ip}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs uppercase font-black tracking-wider text-gray-400 dark:text-gray-500 block mb-1">
                        Audited Log Details
                      </span>
                      <div className="bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-700/60 p-3 rounded-lg text-xs leading-relaxed font-mono text-gray-700 dark:text-gray-300">
                        {selectedLog.details}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setSelectedLog(null)}
                      className="w-full py-3 text-sm font-bold bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-650 text-gray-700 dark:text-gray-200 rounded-xl transition-all cursor-pointer"
                    >
                      Dismiss Event Log
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
