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
import { Button } from "@/components/ui/button";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";

//
import axios from "axios";
import { useState, useEffect } from "react";
import { useRef } from "react";

//
import ThemeToggle from "@/components/Theme/theme-toggle";
function PatientBookAppointment() {
  const api_url = import.meta.env.VITE_API_URL;
  const [doctors, setDoctors] = useState([]); // for dco
  const [search, setSearch] = useState(""); // for search input
  const [department, setDepartment] = useState(""); // for department select
  const [open, setOpen] = useState(false); // for calander close
  const [date, setDate] = useState(null); // for calandar
  const [errors, setErrors] = useState({}); // for error
  const dialogCloseRef = useRef(null); // for modal close

  const [formData, setFormData] = useState(
    {
      title: "",
      description: "",
      time: "10:30:00",
      id: "",
    } // for form data
  );
  const handleChange = (e) => {
    // for formdata
    const { id, value } = e.target;
    // console.log(id, value);

    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = async (e, doctorId) => {
    const userId = sessionStorage.getItem("user_id");
    e.preventDefault();
    // console.log("hai")
    // console.log(formData);
    let validationErrors = {};
    if (!date) validationErrors.date = "date is required";
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // stop submission
    }
    setErrors({});
    const datePart = date.toISOString().split("T")[0]; // '2025-02-02'
    const datetime = `${datePart}T${formData.time}`;
    // console.log(datetime)
    // console.log(id)

    const payload = {
      patientId: userId,
      doctorId: doctorId,
      appointmentDate: datetime,
      title: formData.title,
      description: formData.description,
    };
    try {
      const res = await axios.post(
        `${api_url}/appointment/createAppointment`,
        payload,
        { withCredentials: true }
      );
      // console.log("Server response:", res.data.data);
      alert("Appointment booked successfully");

      if (dialogCloseRef.current) dialogCloseRef.current.click();

      // Reset form
      setFormData({ title: "", description: "", time: "10:30:00", id: "" });
      setDate(null);
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

  const handleDeptChange = (value) => {
    if (value === "__reset") {
      setDepartment("");
    } else {
      setDepartment(value);
    }
  };

  const doc = async () => {
    try {
      const res = await axios.get(`${api_url}/doctor/getdoctor`, {
        withCredentials: true,
      });
      setDoctors(res.data.data);
    } catch (err) {
      console.error("Error loading doctors", err);
    }
  };
  // load once
  useEffect(() => {
    doc();
  }, []);
  // console.log(doctors)
  const filter = doctors.filter((d) => {
    if (d.active) {
      const matchesSearch = d.firstName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchDepartment = department ? d.department === department : true;

      return matchesSearch && matchDepartment;
    }
  });

  return (
    <>
      <div className={`flex-1 flex flex-col`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow-md  flex justify-between items-center border-b p-3">
          <div className="flex items-center space-x-2">
            {/* Hamburger for mobile */}

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 pl-4">
              Book Appointment
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </header>
        {/* searchbar */}
        <div className="p-5 grid grid-cols-2">
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
        </div>
        {/* doctor view  */}

        <div className="p-2">
          <div className="bg-zinc-100 dark:bg-slate-950 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50">
            {filter.map((d) => (
              <div
                className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 transition-colors duration-300"
                key={d._id}
              >
                {/* <span class="text-xs bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300 px-3 py-1 rounded-full">
                active
              </span> */}
                <span className=" mx- text-sm font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-3 py-1 rounded-full">
                  {d.department}
                </span>

                {/* <div class="flex justify-center my-4">
                <div
                  class="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 
                    flex items-center justify-center text-2xl font-semibold 
                    text-gray-600 dark:text-gray-300"
                >
                  JC
                </div>
              </div> */}
                <h2 className="text-center text-lg font-semibold mt-1 text-gray-900 dark:text-white">
                  {d.firstName} {d.lastName}
                </h2>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  {d.email}
                </p>

                <div className="grid grid-cols-3 text-center mt-6 gap-5">
                  {/* <div>
                  <p class="font-semibold text-sm text-gray-500 dark:text-gray-400">
                    Department
                  </p>
                  <p class="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                     {d.department}</p>
                </div> */}

                  <div>
                    <p className="font-semibold text-sm text-gray-500 dark:text-gray-400">
                      Experiance
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                      {d.experiance}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-500 dark:text-gray-400">
                      Qualifications
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                      {d.qualification}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-500 dark:text-gray-400">
                      Gender
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                      {d.gender}
                    </p>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="m-3 py-4 px-3">Book Appointment</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={(e) => handleSubmit(e, d.userId)}>
                      <DialogHeader>
                        <DialogTitle>Book Appoinment</DialogTitle>
                        <DialogDescription>
                          Select date and time for your Slot
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
                          <Label htmlFor="description">Descrption</Label>
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
                        <div className="flex gap-4">
                          <div className="flex flex-col gap-3">
                            <Label htmlFor="date-picker" className="px-1">
                              Date
                            </Label>
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  id="date-picker"
                                  className="w-32 justify-between font-normal"
                                >
                                  {date
                                    ? date.toLocaleDateString()
                                    : "Select date"}
                                  <ChevronDownIcon />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto overflow-hidden p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={date}
                                  captionLayout="dropdown"
                                  required
                                  onSelect={(date) => {
                                    setDate(date);
                                    setOpen(false);
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="flex flex-col gap-3">
                            <Label htmlFor="time-picker" className="px-1">
                              Time
                            </Label>
                            <Input
                              type="time"
                              id="time"
                              value={formData.time}
                              onChange={handleChange}
                              step="1"
                              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            />
                          </div>
                        </div>
                      </div>
                      {errors.date && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.date}
                        </p>
                      )}
                      {errors.err && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.err}
                        </p>
                      )}
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button ref={dialogCloseRef} variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientBookAppointment;
