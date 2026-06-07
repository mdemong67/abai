"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardMessagesPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Messages
        </h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>Message {i}</CardTitle>
                <p className="text-sm text-gray-500">
                  From: Admin · 2 hours ago
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  This is a sample message for demonstration purposes. You can
                  reply or delete messages here.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
