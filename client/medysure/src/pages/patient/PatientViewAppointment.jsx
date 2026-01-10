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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { MoreHorizontal, ChevronDownIcon } from "lucide-react";

import ThemeToggle from "@/components/Theme/theme-toggle";
import { PatientAddFeedback } from "./PatientAddFeedback";
//
import { useState, useEffect } from "react";
import { useRef } from "react";

import axios from "axios";

function PatientViewAppointment() {
  const userId = sessionStorage.getItem("user_id");
  const api_url = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(""); // for search input
  const [department, setDepartment] = useState(""); // for department select
  const [status, setStatus] = useState(""); // for status select
  const [errors, setErrors] = useState({}); // for error
  const dialogCloseRef = useRef(null); // for modal close
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(
    {
      title: "",
      description: "",
    } // for form data
  );
  const statusColors = {
    pending: "bg-yellow-500",
    scheduled: "bg-blue-500",
    rescheduled: "bg-purple-500",
    cancelled: "bg-red-500",
    completed: "bg-green-500",
  };
  const statusProgress = {
    pending: "10",
    scheduled: "75",
    rescheduled: "50",
    cancelled: "0",
    completed: "100",
  };

  const handleDeptChange = (value) => {
    if (value === "__reset") {
      setDepartment("");
    } else {
      setDepartment(value);
    }
  };
  const handleStatustChange = (value) => {
    if (value === "__reset") {
      setStatus("");
    } else {
      setStatus(value);
    }
  };
  const handleChange = (e) => {
    // for formdata
    const { id, value } = e.target;
    // console.log(id, value);

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

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
  // update appointment
  const handleEdit = async (e, _id, status) => {
    e.preventDefault();
    let validationErrors = {};
    if (status === "cancelled" || status === "completed") {
      validationErrors.err =
        "You are selected non editable status, please choose other";
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return; // stop submission
      }
    }
    setErrors({});

    try {
      const updatedAppointment = {
        title: formData.title,
        description: formData.description,
      };
      // console.log(updatedAppointment)
      const res = await axios.put(
        `${api_url}/appointment/updateAppointment/${_id}`,
        updatedAppointment,
        { withCredentials: true }
      );
      dialogCloseRef.current.click();
      appointment();

      // console.log("Server response:", res.data.data);
      alert("Appointment updated successfully");
    } catch (error) {
      if (error.response) {
        // Backend returned error (like 401)
        validationErrors.err = error.response.data.message || "failed";
      } else if (error.request) {
        validationErrors.err = "Server not responding. Try again later.";
      } else {
        validationErrors.err = "Something went wrong: " + error.message;
      }
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      }
    }
  };

  const handleDelete = async (_id) => {
    // Simple delete confirmation + remove from list
    if (confirm("Delete this task?")) {
      //  console.log(id)
      try {
        await axios.delete(`${api_url}/appointment/deleteAppointment/${_id}`, {
          withCredentials: true,
        });

        console.log("Appointment deleted:", _id);

        // re-fetch data
        appointment();
      } catch (error) {
        console.error("Error deleting Appointment", error);
      }
    }
  };
  const handlePayment = async (doctorId,_id) => {
    
    try {
      const response = await axios.post(
        `${api_url}/payment/create-checkout-session`,
        {
        userId,
        appointmentId: _id,
        doctorId,
      },
        { withCredentials: true }
      );

      // Redirect to Stripe Checkout
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed");
    }
  };
  // load once
  useEffect(() => {
    appointment();
  }, []);
  const filter = data.filter((d) => {
    const matchesSearch = d.doctorName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchDepartment = department
      ? d.doctorDepartment === department
      : true;
    const matchStatus = status ? d.status === status : true;

    return matchesSearch && matchDepartment && matchStatus;
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
                        placeholder="Search doctor"
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
                  <Select value={department} onValueChange={handleDeptChange}>
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
                      <th className="p-2">Appointment Title</th>
                      <th className="p-2">Status</th>

                      <th className="p-2">Booked Date</th>
                      <th className="p-2">Scheduled Date</th>
                      <th className="p-2">Doctor</th>
                      <th className="p-2">Department</th>

                      <th className="p-2">Notes</th>
                      <th className="p-2">Description</th>
                      <th className="p-2">Payment</th>

                      <th className="p-2">Progress</th>
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
                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {d.payment ? "Yes" : "No"}
                        </td>
                        <td className="p-3 w-40">
                          <Progress
                            value={statusProgress[d.status]}
                            className="h-2"
                          />
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
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <button
                                      className="text-green-600 font-medium "
                                      onClick={() => {
                                        setErrors({});
                                        setFormData({
                                          title: d.title,
                                          description: d.description,
                                        });
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <form
                                      onSubmit={(e) =>
                                        handleEdit(e, d._id, d.status)
                                      }
                                    >
                                      <DialogHeader>
                                        <DialogTitle>
                                          Update Appoinment
                                        </DialogTitle>
                                        <DialogDescription>
                                          Update title and description
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="grid gap-4">
                                        <div className="grid gap-3">
                                          <Label htmlFor="title">Title</Label>
                                          <Input
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                          />
                                        </div>
                                        <div className="grid gap-3">
                                          <Label htmlFor="description">
                                            Descrption
                                          </Label>
                                          <InputGroup>
                                            <InputGroupTextarea
                                              placeholder="Enter your descrption"
                                              id="description"
                                              name="description"
                                              value={formData.description}
                                              onChange={handleChange}
                                              required
                                            />
                                            <InputGroupAddon align="block-end">
                                              <InputGroupText className="text-muted-foreground text-xs">
                                                60 characters
                                              </InputGroupText>
                                            </InputGroupAddon>
                                          </InputGroup>
                                        </div>
                                      </div>

                                      {errors.err && (
                                        <p className="text-red-500 text-sm mt-1">
                                          {errors.err}
                                        </p>
                                      )}
                                      <DialogFooter>
                                        <DialogClose asChild>
                                          <Button
                                            ref={dialogCloseRef}
                                            variant="outline"
                                          >
                                            Cancel
                                          </Button>
                                        </DialogClose>
                                        <Button type="submit">
                                          Save changes
                                        </Button>
                                      </DialogFooter>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                              </DropdownMenuItem>
                              {d.status === "completed" && (
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <button onClick={() => setOpen(true)}>
                                    Feedback
                                  </button>

                                  <PatientAddFeedback
                                    open={open}
                                    setOpen={setOpen}
                                    _id={d._id}
                                    doctorId={d.doctorId}
                                  />
                                </DropdownMenuItem>
                              )}
                              {!d.payment && (
                                <DropdownMenuItem
                                className="text-blue-600"
                                onClick={() => handlePayment(d.doctorId,d._id)}
                              >
                                Pay Now
                              </DropdownMenuItem>
                              )}
                              
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDelete(d._id)}
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
