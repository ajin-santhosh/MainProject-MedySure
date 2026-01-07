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

import { MoreHorizontal, ChevronDownIcon } from "lucide-react";

import ThemeToggle from "@/components/Theme/theme-toggle";
import { Star } from "lucide-react";

//
import { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";

function DoctorViewFeedback() {
    const userId = sessionStorage.getItem("user_id");
  const api_url = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(""); // for search input

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(
        `${api_url}/feedback/getFeedbackForDoctor/${userId}`,
        {
          withCredentials: true,
        }
      );
      setData(res.data.data);
    } catch (err) {
      console.error("Error loading feedbacks", err);
    }
  };
 
  // load once
  useEffect(() => {
    fetchFeedback();
  }, []);
  const filter = data.filter((d) => {
    const matchesSearch =
      d.patientName.toLowerCase().includes(search.toLowerCase()) ||
      d.appointment.toLowerCase().includes(search.toLowerCase()) 
    return matchesSearch;
  });
  return (
<>
      <div className={`flex-1 flex flex-col`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow-md  flex justify-between items-center border-b p-3">
          <div className="flex items-center space-x-2">
            {/* Hamburger for mobile */}

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 pl-4">
              My FeedBack
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
                        placeholder="Search by patient / appointment"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </div>

              {/* <div>
                    {" "}
                    <Badge variant="secondary" className="text-sm px-2 py-1">
                      {data.length}
                    </Badge>{" "}
                  </div> */}
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
                      <th className="p-2">Rating</th>
                                            <th className="p-2">Patient Name</th>

                      <th className="p-2">Appointment Title</th>
                      <th className="p-2">Appointment date</th>
                      <th className="p-2">Description</th>
                      <th className="p-2">Date</th>

                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {filter.map((d) => (
                      <tr
                        key={d._id}
                        className="bg-gray-100 dark:bg-neutral-800 shadow-sm rounded-xl"
                      >
                        <td className="p-3 font-medium dark:text-white">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={
                                  i < d.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </td>
                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.patientName}
                        </td>

                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.appointment}
                        </td>
                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.appointmentDate}
                        </td>
                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.description}
                        </td>
                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.date}
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
                              {/* <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => deleteFeedback(d._id)}
                              >
                                Delete
                              </DropdownMenuItem> */}
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
    </>  )
}

export default DoctorViewFeedback