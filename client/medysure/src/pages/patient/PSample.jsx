"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Description } from "@radix-ui/react-dialog";

const tasks = [
  {
    id: 1,
    title: "Update calendar and schedule",
    created: "20 Jun 2025",
    status: "Completed",
    due: "25 Jun 2025",
    doctor:"abcd",
    notes:"1234567890",
    description:"zxcvbnlkjhgfdfgh",
    progress: 80,
    statusColor: "bg-green-600",
  },
  {
    id: 2,
    title: "Update calendar and schedule",
    created: "20 Jun 2025",
    status: "Completed",
    due: "25 Jun 2025",
    doctor:"abcd",
    notes:"1234567890 wsdasw qeer ewre re rerew rewr weettes",
    description:"zxcvbnlkjhgfdfgh aedae ef ewrewrew rewrewr esrerer ewerer erere reer er er erer ere rer",
    progress: 80,
    statusColor: "bg-green-600",
  },
  // {
  //   id: 2,
  //   title: "Finalize project proposal",
  //   created: "15 Jun 2025",
  //   status: "On Hold",
  //   due: "20 Jun 2025",
  //   progress: 60,
  //   statusColor: "bg-pink-600",
  // },
  // {
  //   id: 3,
  //   title: "Submit to supervisor by EOD",
  //   created: "02 Jun 2025",
  //   status: "Pending",
  //   due: "07 Jun 2025",
  //   progress: 50,
  //   statusColor: "bg-purple-600",
  // },
  // {
  //   id: 4,
  //   title: "Prepare presentation slides",
  //   created: "24 May 2025",
  //   status: "Completed",
  //   due: "30 May 2025",
  //   progress: 100,
  //   statusColor: "bg-green-600",
  // },
  // {
  //   id: 5,
  //   title: "Check and respond to emails",
  //   created: "18 May 2025",
  //   status: "Pending",
  //   due: "07 Jun 2025",
  //   progress: 55,
  //   statusColor: "bg-purple-600",
  // },
  // {
  //   id: 6,
  //   title: "Daily admin tasks organized",
  //   created: "13 May 2025",
  //   status: "Inprogress",
  //   due: "18 May 2025",
  //   progress: 80,
  //   statusColor: "bg-blue-600",
  // },
];

export default function TodoDashboard() {
  const [rows, setRows] = React.useState(tasks);

  function handleEdit(taskId) {
    // TODO: replace with real edit logic (open modal / navigate)
    // Example:
    alert("Edit task id: " + taskId);
  }

  function handleDelete(taskId) {
    // Simple delete confirmation + remove from list
    if (confirm("Delete this task?")) {
      setRows((prev) => prev.filter((t) => t.id !== taskId));
    }
  }

  return (
    <Card className="shadow-lg ">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Todo</h2>
          <Badge variant="secondary" className="text-sm px-2 py-1">
            {rows.length}
          </Badge>
        </div>
        <hr />

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-sm text-gray-600 dark:text-gray-300">
                <th className="p-2">Appointment Title</th>
                <th className="p-2">Status</th>

                <th className="p-2">Booked Date</th>
                <th className="p-2">Scheduled Date</th>
                <th className="p-2">Doctor</th>
                <th className="p-2">Notes</th>
                <th className="p-2">Description</th>

                <th className="p-2">Progress</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {rows.map((task) => (
                <tr
                  key={task.id}
                  className="bg-gray-100 dark:bg-neutral-800 shadow-sm rounded-xl"
                >
                  <td className="p-3 font-medium dark:text-white">
                    {task.title}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-white text-xs rounded-md ${task.statusColor}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {task.created}
                  </td>
                  
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {task.due}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {task.doctor}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {task.notes}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {task.description}
                  </td>
                  <td className="p-3 w-40">
                    <Progress value={task.progress} className="h-2" />
                    <span className="text-xs text-gray-600 dark:text-gray-300 mt-1 block">
                      {task.progress}%
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label="open menu"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        side="bottom"
                        className="w-36"
                      >
                        <DropdownMenuItem onClick={() => handleEdit(task.id)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(task.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
