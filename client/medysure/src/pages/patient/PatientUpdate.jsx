import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react"; 
import axios from "axios";
function PatientUpdate({ isOpen, onClose,initialData,onUpdate}) {
  if (!isOpen) return null;
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
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  // For custom Select components
  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
onUpdate?.();
      // alert("Patient update completed successfully");
      toast.success("Profile Updated SuccessFully")
      onClose()
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
                <form className="space-y-6" onSubmit={handleSubmit}>

      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col  "
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🔹 Body (Scrollable) */}
        <div className="overflow-y-auto px-6 py-6">
            <FieldGroup>
              <CardTitle className="mb-4">Patient Details</CardTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>E Mail</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />{" "}
                </Field>

                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Field>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>First Name</FieldLabel>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />{" "}
                </Field>

                <Field>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />                </Field>
              </div>

              {/* Phone */}
              <Field>
                <FieldLabel>Phone Number</FieldLabel>
                <Input
                  id="phone"
                  type="text"
                  placeholder="+91 ..."
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />              </Field>

              {/* Gender & Blood Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Gender</FieldLabel>
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
                </Field>

                <Field>
                  <FieldLabel>Blood Group</FieldLabel>
                  <Select value={formData.blood_group}
                    onValueChange={(value) =>
                      handleSelectChange("blood_group", value)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
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
                </Field>
              </div>

              {/* Age / Height / Weight */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>Age</FieldLabel>
                  <Input
                    id="age"
                    type="text"
                    placeholder=".."
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />                </Field>

                <Field>
                  <FieldLabel>Height</FieldLabel>
                  <Input
                    id="height"
                    type="text"
                    placeholder=".. cm"
                    value={formData.height}
                    onChange={handleChange}
                    required
                  />                </Field>

                <Field>
                  <FieldLabel>Weight</FieldLabel>
                  <Input
                    id="weight"
                    type="text"
                    placeholder=".. kg"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                  />                </Field>
              </div>

              {/* Place */}
              <Field>
                <FieldLabel>Place</FieldLabel>
                <Input
                  id="place"
                  type="text"
                  placeholder="...."
                  value={formData.place}
                  onChange={handleChange}
                  required
                />              </Field>
            </FieldGroup>
          
        </div>

        {/* 🔹 Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type ="submit"className="bg-blue-600 hover:bg-blue-700 text-white">
            Update
          </Button>
        </div>
      </div>
      </form>
    </div>
  );
}

export default PatientUpdate;
