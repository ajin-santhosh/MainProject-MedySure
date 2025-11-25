import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/Theme/theme-toggle";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PatientRegistration() {
  const userId = sessionStorage.getItem("user_id");
  const api_url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
   
  // Single state object for all fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    blood_group: "",
    age: "",
    height: "",
    weight: "",
    place: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
  });

  // Generic input handler
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // For custom Select components
  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
   let validationErrors = {};
  if (!formData.gender) validationErrors.gender = "Gender is required";
  if (!formData.blood_group) validationErrors.blood_group = "Blood group is required";
     if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // stop submission
    }

    setErrors({});

    // Prepare payload for backend
    const payload = {
      userId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      gender: formData.gender,
      age: formData.age,
      blood_group: formData.blood_group,
      height: formData.height,
      weight: formData.weight,
      place: formData.place,
      emergencyContact: {
        name: formData.emergencyContactName,
        relation: formData.emergencyContactRelation,
        phone: formData.emergencyContactPhone,
      },
    };
     
    try {
      const res = await axios.post(
        `${api_url}/patient/patienDetailsRegister`,
        payload,{
          withCredentials:true
        }
      );
      console.log("Server response:", res.data);
      sessionStorage.removeItem("user_id");
      alert("registration completed successfully")
      navigate("/"); // or wherever you want

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-7xl font-pfont_2">
        <div className="absolute top-2 right-2 p-2">
          <ThemeToggle />
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Patient Form</CardTitle>
            <CardDescription>
              Enter your information below to complete your registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row justify-center gap-6 p-4 md:p-10">
                {/* Patient Details */}
                <div className="border-2 border-gray-200 p-4 md:p-6 w-full md:w-1/2 flex-auto rounded-lg">
                  <FieldGroup>
                    <CardTitle>Patient Details</CardTitle>

                    <Field>
                      <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                      <Input
                        id="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                      <Input
                        id="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                      <Input
                        id="phone"
                        placeholder="+91 ..."
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </Field>

                    <div className="flex gap-3">
                      <FieldLabel htmlFor="gender">Gender</FieldLabel>
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
        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                      </Select>

                      <FieldLabel htmlFor="blood_group">Blood Group</FieldLabel>
                      <Select
                        value={formData.blood_group}
                        onValueChange={(value) =>
                          handleSelectChange("blood_group", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Blood Group" />
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
                      </Select>
                              {errors.blood_group && <p className="text-red-500 text-sm mt-1">{errors.blood_group}</p>}

                    </div>

                    <div className="flex gap-2 p-10">
                      <Field>
                        <FieldLabel htmlFor="age">Age</FieldLabel>
                        <Input
                          id="age"
                          placeholder="Age"
                          value={formData.age}
                          onChange={handleChange}
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="height">Height</FieldLabel>
                        <Input
                          id="height"
                          placeholder="Height"
                          value={formData.height}
                          onChange={handleChange}
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="weight">Weight</FieldLabel>
                        <Input
                          id="weight"
                          placeholder="Weight"
                          value={formData.weight}
                          onChange={handleChange}
                          required
                        />
                      </Field>
                    </div>

                    <Field>
                      <FieldLabel htmlFor="place">Place</FieldLabel>
                      <Input
                        id="place"
                        placeholder="Place"
                        value={formData.place}
                        onChange={handleChange}
                        required
                      />
                    </Field>
                  </FieldGroup>
                </div>

                {/* Emergency Contact Details */}
                <div className="border-2 border-gray-200 p-4 md:p-6 w-full md:w-1/2 flex-auto rounded-lg">
                  <FieldGroup>
                    <CardTitle>Emergency Contact Details</CardTitle>

                    <Field>
                      <FieldLabel htmlFor="emergencyContactName">Name</FieldLabel>
                      <Input
                        id="emergencyContactName"
                        placeholder="Name"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="emergencyContactRelation">
                        Relation
                      </FieldLabel>
                      <Input
                        id="emergencyContactRelation"
                        placeholder="Relation"
                        value={formData.emergencyContactRelation}
                        onChange={handleChange}
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="emergencyContactPhone">
                        Phone Number
                      </FieldLabel>
                      <Input
                        id="emergencyContactPhone"
                        placeholder="+91 ..."
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                        required
                      />
                    </Field>
                  </FieldGroup>
                </div>
              </div>

              {/* Submit button */}
              <FieldGroup>
                
                <Field>
                  <div className="flex justify-center mt-4">
                  <Button type="submit" className="w-full md:w-1/4">
                    Register
                  </Button>
                  </div>
                </Field>

              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PatientRegistration;
