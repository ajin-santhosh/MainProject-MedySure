import React from "react";
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

function AdminUpdatePatients({ initialData }) {
  const api_url = import.meta.env.VITE_API_URL;
  //   const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: initialData?.email || "",
    password: "",
    active: initialData?.active || false,
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    gender: initialData?.gender || "",
    phone: initialData?.phone || "",
    age: initialData?.age || "",
    blood_group: initialData?.blood_group || "",
    height: initialData?.height || "",
    weight: initialData?.weight || "",
    place: initialData?.place || "",
    paid: initialData?.paid || "",
    // emergencyContactname: initialData?.emergencyContactname || "",
    // emergencyContactrelation: initialData?.emergencyContactrelation || "",
    // emergencyContactphone: initialData?.emergencyContactphone || "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  // For custom Select components
  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  // for handle toggle
  const handleToggle = (e) => {
    const { id, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!formData.gender) validationErrors.gender = "Gender is required";
    if (!formData.blood_group)
      validationErrors.blood_group = "blood group is required";
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // stop submission
    }
    setErrors({});
    let payload = {
      email: formData.email,
      password: formData.password,
      active: formData.active,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      gender: formData.gender,
      age: formData.age,
      blood_group: formData.blood_group,
      height: formData.height,
      weight: formData.weight,
      place: formData.place,
    };
    if (!formData.password) {
      payload = {
        email: formData.email,
        active: formData.active,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        gender: formData.gender,
        age: formData.age,
        blood_group: formData.blood_group,
        height: formData.height,
        weight: formData.weight,
        place: formData.place,
        //   emergencyContact: {
        //     name: formData.emergencyContactname,
        //     relation: formData.emergencyContactrelation,
        //     phone: formData.emergencyContactphone,
        //   },
      };
    }

    console.log(payload);

    try {
      const res = await axios.put(
        `${api_url}/patient/updatePatient/${initialData.userId}`,
        payload,
        {
          withCredentials: true,
        }
      );
      console.log("Server response:", res.data.data);
      alert("Patient update completed successfully");
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
  };

  return (
    <>
      <SheetContent>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Update patient</SheetTitle>
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
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
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
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="+91 ..."
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="place">Place</Label>
                <Input
                  id="place"
                  type="text"
                  placeholder="...."
                  value={formData.place}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="blood_group"> Blood Group</Label>
                <Select
                  value={formData.blood_group}
                  onValueChange={(value) =>
                    handleSelectChange("blood_group", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="A+">A positive (A+)</SelectItem>
                      <SelectItem value="A-">A negative (A-)</SelectItem>
                      <SelectItem value="B+">B positive (B+)</SelectItem>
                      <SelectItem value="B-">B negative (B-)</SelectItem>
                      <SelectItem value="AB+">AB positive (AB+)</SelectItem>
                      <SelectItem value="AB-">AB negative (AB-)</SelectItem>
                      <SelectItem value="O+">O positive (O+)</SelectItem>
                      <SelectItem value="O-">O negative (O-)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                  {errors.blood_group && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.blood_group}
                    </p>
                  )}
                </Select>
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
            <div className="grid grid-cols-3 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="phone">Age</Label>
                <Input
                  id="age"
                  type="text"
                  placeholder=".."
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="height">Hieght</Label>
                <Input
                  id="height"
                  type="text"
                  placeholder=".. cm"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="text"
                  placeholder=".. kg"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div // toggle
              className="grid grid-cols-2"
            >
              <div>
                <h2 className="text-sm font-semibold">
                  User Status:{" "}
                  <span className="text-sm font-semibold text-blue-500">
                    {" "}
                    {formData.active ? "Active" : "Inactive"}
                  </span>
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

            <div className="grid gap-2">
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

export default AdminUpdatePatients;
