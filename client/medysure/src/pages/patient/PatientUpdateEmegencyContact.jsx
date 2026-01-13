import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function PatientUpdateEmegencyContact({ isOpen, onClose }) {
      if (!isOpen) return null;

  const api_url = import.meta.env.VITE_API_URL;
  const userId = sessionStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    phone: "",
  });

  /* 🔹 Fetch Emergency Contact */
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${api_url}/patient/getEmergencyContactById/${userId}`,
        { withCredentials: true }
      );

      // assuming backend returns { emergencyContact: {...} }
      setFormData(res.data.emergencyContact);
    } catch (err) {
      console.error("Error loading emergency contact", err);
    }
  };

  /* 🔹 Update Emergency Contact */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${api_url}/patient/updateEmergencyContact/${userId}`,
        formData,
        { withCredentials: true }
      );
      alert("Updated Emergancy Contact")
      onClose();

    } catch (err) {
      console.error("Error updating emergency contact", err);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <form
        className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🔹 Body */}
        <div className="overflow-y-auto px-6 py-6">
          <FieldGroup>
            <CardTitle className="mb-4">
              Emergency Contact Details
            </CardTitle>

            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel>Relation</FieldLabel>
              <Input
                id="relation"
                type="text"
                placeholder="Relation"
                value={formData.relation}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel>Phone Number</FieldLabel>
              <Input
                id="phone"
                type="text"
                placeholder="+91..."
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Field>
          </FieldGroup>
        </div>

        {/* 🔹 Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PatientUpdateEmegencyContact;
