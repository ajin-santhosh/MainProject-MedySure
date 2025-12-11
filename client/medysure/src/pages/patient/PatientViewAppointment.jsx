import React from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import ThemeToggle from "@/components/Theme/theme-toggle";
import PSample from "./PSample";

//
import { useState, useEffect } from "react";
import axios from "axios";

// const tasks = [
//   {
//     id: 1,
//     title: "Update calendar and schedule",
//     created: "20 Jun 2025",
//     status: "Completed",
//     due: "25 Jun 2025",
//     doctor:"abcd",
//     department:"234",
//     notes:"1234567890",
//     description:"zxcvbnlkjhgfdfgh",
//     progress: 80,
//     statusColor: "bg-green-600",
//   },
//   {
//     id: 2,
//     title: "Update calendar and schedule",
//     created: "20 Jun 2025",
//     status: "Completed",
//     due: "25 Jun 2025",
//     doctor:"abcd",
//         department:"234",

//     notes:"1234567890 wsdasw qeer ewre re rerew rewr weettes",
//     description:"zxcvbnlkjhgfdfgh aedae ef ewrewrew rewrewr esrerer ewerer erere reer er er erer ere rer",
//     progress: 80,
//     statusColor: "bg-green-600",
//   },
// ]
function PatientViewAppointment() {
  const userId = sessionStorage.getItem("user_id");
  const api_url = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const statusColors = {
  pending: "bg-yellow-500",
  scheduled: "bg-blue-500",
  rescheduled: "bg-purple-500",
  cancelled: "bg-red-500",
  completed: "bg-green-500",
}
const statusProgress = {
  pending: "10",
  scheduled: "75",
  rescheduled: "50",
  cancelled: "0",
  completed: "100",
}

  // fetch appoointments
  const appointment = async () => {
    try {
      const res = await axios.get(
        `${api_url}/appointment/getAppointmentForPatient/${userId}`,
        {
          withCredentials: true,
        }
      );
      setData(res.data.data);
    } catch (err) {
      console.error("Error loading appointments", err);
    }
  };

  function handleEdit(id) {
    // TODO: replace with real edit logic (open modal / navigate)
    // Example:
    alert("Edit task id: " + id);
  }

  function handleDelete(id) {
    // Simple delete confirmation + remove from list
    if (confirm("Delete this task?")) {
      setData((prev) => prev.filter((t) => t.id !== id));
    }
  }
  // load once
  useEffect(() => {
    appointment();
  }, []);
  return (
    <>
      <div className={`flex-1 flex flex-col`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow-md  flex justify-between items-center border-b p-3">
          <div className="flex items-center space-x-2">
            {/* Hamburger for mobile */}

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 pl-4">
              My Appointment
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </header>
        <div className="p-5">
          {/* searchbar */}

          <Card className="shadow-lg ">
            <div className="p-2 grid grid-cols-3 gap-5 items-center">
              <div className="w-full max-w-md">
                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Search doctor"
                        // value={search}
                        // onChange={(e) => setSearch(e.target.value)}
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </div>
              {/* selectbox */}
              <div className="w-full max-w-md">
                <Field>
                  <Select
                  //   value={department} onValueChange={handleDeptChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__reset">All</SelectItem>
                      <SelectItem value="generalMedicine">
                        General Medicine
                      </SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="gynecology">Gynecology</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="neurology"> Neurology</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div>
                {" "}
                <Badge variant="secondary" className="text-sm px-2 py-1">
                  {data.length}
                </Badge>{" "}
              </div>
            </div>

            <CardContent className="p-6">
              {/* <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold dark:text-white">Todo</h2>
                      
                    </div> */}
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
                      <th className="p-2">Department</th>

                      <th className="p-2">Notes</th>
                      <th className="p-2">Description</th>

                      <th className="p-2">Progress</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((d) => (
                      <tr
                        key={d._id}
                        className="bg-gray-100 dark:bg-neutral-800 shadow-sm rounded-xl"
                      >
                        <td className="p-3 font-medium dark:text-white">
                          {d.title}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 text-white text-xs rounded-md ${
                              statusColors[d.status] || "bg-gray-400"
                            } `}
                          >
                            {d.status}
                          </span>
                        </td>
                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.createdAt}
                        </td>

                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.appointmentDate}
                        </td>
                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.doctorName}
                        </td>
                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.doctorDepartment}
                        </td>
                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.notes}
                        </td>
                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.description}
                        </td>
                        <td className="p-3 w-40">
                          <Progress value={statusProgress[d.status]} className="h-2" />
                          <span className="text-xs text-gray-600 dark:text-gray-300 mt-1 block">
                           {statusProgress[d.status]}%
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
                              <DropdownMenuItem
                                onClick={() => handleEdit(d.id)}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDelete(d.id)}
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
        </div>
      </div>
    </>
  );
}

export default PatientViewAppointment;
