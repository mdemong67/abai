"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

// Mock events data
const MOCK_EVENTS = [
  {
    id: 1,
    title: "Summer Picnic",
    date: "2024-07-20",
    location: "Dublin",
    type: "Community",
  },
  {
    id: 2,
    title: "Eid Celebration",
    date: "2024-06-15",
    location: "Cork",
    type: "Religious",
  },
  {
    id: 3,
    title: "Independence Day",
    date: "2024-03-26",
    location: "Galway",
    type: "Cultural",
  },
];

export default function DashboardEventsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "moderator"]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Events
          </h1>
          <Button>
            <FiPlus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
        <div className="border rounded-lg overflow-hidden dark:border-gray-800 bg-white dark:bg-gray-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_EVENTS.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400">
                      {event.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="mr-2">
                      <FiEdit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <FiTrash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ProtectedRoute>
  );
}
