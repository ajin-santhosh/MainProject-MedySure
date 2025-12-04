import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AdminAddDoctorSheet({ mode = "add", initialData }) {
  const api_url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: initialData?.email || "",
    password: "",
    active:initialData?.active || false,
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    department: initialData?.department || "",
    experiance: initialData?.experiance || "",
    gender: initialData?.gender || "",
    qualification: initialData?.qualification || "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  // For custom Select components
  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  // for handling toggle
  const handleToggle = (e) => {
    const { id, type, checked,value} = e.target;
    setFormData((prev) => ({
    ...prev,
    [id]: type === "checkbox" ? checked : value,
  }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    
    if (mode === "add") {   // Adding doctor
    if (!formData.password) validationErrors.password = "password is required";
      if (!formData.gender) validationErrors.gender = "Gender is required";
      if (!formData.department)
        validationErrors.department = "deparrtment is required";
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return; // stop submission
      }

      setErrors({});

      const payload = {
        email: formData.email,
        password: formData.password,
        active:formData.active,
        firstName: formData.firstName,
        lastName: formData.lastName,
        department: formData.department,
        experiance: formData.experiance,
        gender: formData.gender,
        qualification: formData.qualification,
      };
    //   console.log(payload);

      try {
        const res = await axios.post(
          `${api_url}/doctor/createDoctor`,
          payload,
          {
            withCredentials: true,
          }
        );
        console.log("Server response:", res.data.data);
        alert("registration completed successfully");
        // navigate("/doctors");
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
    } 
    
    else {
      if (!formData.gender) validationErrors.gender = "Gender is required";
      if (!formData.department)
        validationErrors.department = "deparrtment is required";
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return; // stop submission
      }
      setErrors({});
      let payload = {
        email: formData.email,
        password: formData.password,
        active:formData.active,
        firstName: formData.firstName,
        lastName: formData.lastName,
        department: formData.department,
        experiance: formData.experiance,
        gender: formData.gender,
        qualification: formData.qualification,
      };

      if (!formData.password) {
        // check password
         payload = {
          email: formData.email,
          active:formData.active,
          firstName: formData.firstName,
          lastName: formData.lastName,
          department: formData.department,
          experiance: formData.experiance,
          gender: formData.gender,
          qualification: formData.qualification,
        };
      } 

      // console.log(payload)
  try {
        const res = await axios.put(
          `${api_url}/doctor/updateDoctor/${initialData.userId}`,
          payload,
          {
            withCredentials: true,
          }
        );
        console.log("Server response:", res.data.data);
        alert("doctor update completed successfully");
        // navigate("/admin/doctors");
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

    }
  };

  return (
    <>
      <SheetContent>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>
              {mode === "add" ? "Add Doctor" : "Update Doctor"}
            </SheetTitle>
            {/* <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription> */}
          </SheetHeader>
          <hr />

          <div className="grid flex-1 auto-rows-min gap-6 p-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                
              />
              {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="department"> Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) =>
                  handleSelectChange("department", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="generalMedicine">
                      General Medicine
                    </SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="gynecology">Gynecology</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                  </SelectGroup>
                </SelectContent>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department}
                  </p>
                )}
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="experiance">Experiance</Label>
                <Input
                  id="experiance"
                  type="text"
                  placeholder="..+"
                  value={formData.experiance}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                  )}
                </Select>
              </div>
            </div>
            <div // toggle
              className="grid grid-cols-2"
            >
              <div >
                <h2 className="text-sm font-semibold">
                  User Status: <span className="text-sm font-semibold text-blue-500" > {formData.active ? "Active" : "Inactive"}</span>
                 
                </h2>
              </div>

              {/* Hidden real checkbox */}
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                     type="checkbox"
                     id="active"
                    checked={formData.active}
                    onChange={handleToggle}
                    className="sr-only peer"
                  />

                  {/* Track */}
                  <div
                    className="
            w-10 h-4 rounded-full
            peer bg-gray-400 peer-checked:bg-green-500
            transition-colors duration-300
          "
                  ></div>

                  {/* Thumb */}
                  <div
                    className="
            absolute left-1 top-1 w-2 h-2 rounded-full bg-white shadow-md 
            transition-transform duration-300
            peer-checked:translate-x-6
          "
                  ></div>
                </label>
              </div>
            </div> 
            <div className="grid gap-3">
              <Label htmlFor="qualification"> Qualification</Label>
              <Input
                id="qualification"
                type="text"
                placeholder="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
              />
              {errors.err && (
                <p className="text-red-700 text-sm mt-1">{errors.err}</p>
              )}

              <Button type="submit">Save changes</Button>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </div>
        </form>
      </SheetContent>
    </>
  );
}
