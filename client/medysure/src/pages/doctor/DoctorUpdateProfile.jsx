import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { CardTitle } from "@/components/ui/card";
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
function DoctorUpdateProfile({ isOpen, onClose, initialData, onUpdate }) {
  if (!isOpen) return null;
  const api_url = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: initialData?.email || "",
    password: "",
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    gender: initialData?.gender || "",
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
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // stop submission
    }
    setErrors({});
    let payload = {
      email: formData.email,
      password: formData.password,

      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
    };

    if (!formData.password) {
      // check password
      payload = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
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
      onUpdate?.();
      toast.success("Profile Updated Successfully");
      onClose();
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
                <CardTitle className="mb-4">Doctor Details</CardTitle>
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
                    />{" "}
                  </Field>
                </div>

                <Field>
                  <FieldLabel>Gender</FieldLabel>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleSelectChange("gender", value)
                    }
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </Select>
                </Field>
              </FieldGroup>
            </div>

            {/* 🔹 Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default DoctorUpdateProfile;
