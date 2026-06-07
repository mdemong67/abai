"use client";

import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FiEdit, FiTrash2, FiPlus, FiImage } from "react-icons/fi";

export default function DashboardPortfolioPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "moderator"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Portfolio
          </h1>
          <Button>
            <FiPlus className="mr-2 h-4 w-4" />
            Add Album
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="border rounded-xl overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <FiImage className="w-12 h-12 text-gray-300" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Album {i}</h3>
                <p className="text-sm text-gray-500 mt-1">24 photos</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <FiEdit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-red-600"
                  >
                    <FiTrash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
