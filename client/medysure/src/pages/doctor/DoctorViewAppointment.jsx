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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";


import { MoreHorizontal, ChevronDownIcon } from "lucide-react";

import ThemeToggle from "@/components/Theme/theme-toggle";
import DoctorAddNotes from "./DoctorAddNotes";
import DoctorUpdateAppointment from "./DoctorUpdateAppointment";
import { useState, useEffect } from "react";
import { useRef } from "react";

import axios from "axios";
import DoctorCreateReports from "./DoctorCreateReports";

function DoctorViewAppointment() {
  const userId = sessionStorage.getItem("user_id");
  const api_url = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(""); // for search input
  const [status, setStatus] = useState(""); // for status select
  const [activeModal, setActiveModal] = useState(null);

  const statusColors = {
    pending: "bg-yellow-500",
    scheduled: "bg-blue-500",
    rescheduled: "bg-purple-500",
    cancelled: "bg-red-500",
    completed: "bg-green-500",
  };

  const handleStatustChange = (value) => {
    if (value === "__reset") {
      setStatus("");
    } else {
      setStatus(value);
    }
  };

  // fetch appoointments
  const appointment = async () => {
    try {
      const res = await axios.get(
        `${api_url}/appointment/getAppointmentForDoctor/${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setData(res.data.data);
    } catch (err) {
      console.error("Error loading appointments", err);
    }
  };

  // load once
  useEffect(() => {
    appointment();
  }, []);
  const filter = data.filter((d) => {
    const matchesSearch = d.patientName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus = status ? d.status === status : true;

    return matchesSearch && matchStatus;
  });

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
        <div className="p-5 ">
          {/* searchbar */}

          <Card className="shadow-lg bg-zinc-100 dark:bg-slate-950">
            <div className="p-2 grid grid-cols-4 gap-5 items-center">
              <div className="w-full max-w-md">
                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Search patient"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </div>
              {/* selectbox */}
              <div className="w-full max-w-md">
                <Field>
                  <Select value={status} onValueChange={handleStatustChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__reset">All</SelectItem>
                      <SelectItem value="pending">Pending </SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="rescheduled">Rescheduled</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div>
                {" "}
                <Badge className="h-5 min-w-5 rounded-full p-2 font-mono tabular-nums">
                  {data.length}
                </Badge>
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
                      <th className="p-2">Patient Name</th>

                      <th className="p-2">Appointment Title</th>
                      <th className="p-2">Status</th>

                      <th className="p-2">Booked Date</th>
                      <th className="p-2">Scheduled Date</th>
                                           <th className="p-2">Time</th>

                      <th className="p-2">Notes</th>
                      <th className="p-2">Description</th>
                      {/* <th className="p-2">Report</th> */}
                      <th className="p-2">Payment</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filter.map((d) => (
                      <tr
                        key={d._id}
                        className="bg-gray-100 dark:bg-neutral-900 shadow-sm rounded-xl"
                      >
                        <td className="p-3 font-medium  dark:text-white">
                          {d.patientName}
                        </td>
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
                          {d.appointmentTime}
                        </td>

                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.notes}
                        </td>
                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.description}
                        </td>
                        {/* <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.report ? "Yes" : "No"}
                        </td> */}
                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.payment ? "Yes" : "No"}
                          {/* {console.log(d.Payment, typeof d.Payment) */}
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
                                onSelect={(e) => e.preventDefault()}
                              >
                                <button
                                  onClick={() => setActiveModal("appointment")}
                                  className="text-green-600 font-medium "
                                >
                                  Update
                                </button>

                                <DoctorUpdateAppointment
                                  open={activeModal === "appointment"}
                                  setOpen={(isOpen) => {
                                    if (!isOpen) setActiveModal(null);
                                  }}
                                  appointmentId={d._id}
                                  existingDate={d.appointmentDate}
                                  existingStatus={d.status}
                                  onUpdate={appointment}
                                />
                              </DropdownMenuItem>{" "}
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <button
                                  onClick={() => setActiveModal("notes")}
                                  className="text-blue-600 font-medium "
                                >
                                  {d.notes ? "Update Notes" : "Add Notes"}
                                </button>

                                <DoctorAddNotes
                                  open={activeModal === "notes"}
                                  setOpen={(isOpen) => {
                                    if (!isOpen) setActiveModal(null);
                                  }}
                                  appointmentId={d._id}
                                  existingNotes={d.notes}
                                  onUpdate={appointment}
                                />
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <button
                                  onClick={() => setActiveModal("report")}
                                  className="text-red-600 font-medium "
                                >
                                  Send Report
                                </button>

                                <DoctorCreateReports
                                  open={activeModal === "report"}
                                  setOpen={(isOpen) => {
                                    if (!isOpen) setActiveModal(null);
                                  }}
                                  patientId={d.patientId}
                                  onUpdate={appointment}
                                />
                              </DropdownMenuItem>{" "}
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

export default DoctorViewAppointment;
