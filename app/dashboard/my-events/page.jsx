"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FiCalendar } from "react-icons/fi";

export default function DashboardMyEventsPage() {
  return (
    <ProtectedRoute allowedRoles={["user", "admin", "moderator"]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Events
        </h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Event {i}
                </CardTitle>
                <FiCalendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Upcoming</div>
                <p className="text-xs text-gray-500 mt-1">
                  July 20, 2024 · Dublin
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
