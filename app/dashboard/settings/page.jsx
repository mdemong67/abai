"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/components/providers/AuthProvider";

export default function DashboardSettingsPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <div className="border rounded-lg overflow-hidden dark:border-gray-800 bg-white dark:bg-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <div className="grid gap-4 max-w-md">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Name
              </label>
              <Input defaultValue={user?.name} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Email
              </label>
              <Input defaultValue={user?.email} />
            </div>
            <Button className="w-fit">Save Changes</Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
