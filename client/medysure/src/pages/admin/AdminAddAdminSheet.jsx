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
import { Toggle } from "@/components/ui/toggle";
import {} from "lucide-react";
import { useState } from "react";
import axios from "axios";
function AdminAddAdminSheet({ mode = "add", initialData }) {
  const api_url = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: initialData?.email || "",
    password: "",
    active: initialData?.active || false,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleToggle = (e) => {
    const { id, type, checked,value} = e.target;
    setFormData((prev) => ({
    ...prev,
    [id]: type === "checkbox" ? checked : value,
  }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (mode === "add") {
      // Adding Admin
      if (!formData.password)
        validationErrors.password = "password is required";
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return; // stop submission
      }

      setErrors({});

      const payload = {
        email: formData.email,
        password: formData.password,
        active:formData.active
      };
       console.log(payload);

      try {
        const res = await axios.post(`${api_url}/admin/createAdmin`, payload, {
          withCredentials: true,
        });
        console.log("Server response:", res.data.data);
        alert("registration completed successfully");
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
    } else {
      setErrors({});

      let payload = {
        email: formData.email,
        password: formData.password,
        active:formData.active

      };
      if (!formData.password) {
        // check password
        payload = {
          email: formData.email,
          active:formData.active

        };
      }
      //   console.log(payload);

      try {
        const res = await axios.put(
          `${api_url}/admin/updateAdmin/${initialData._id}`,
          payload,
          {
            withCredentials: true,
          }
        );
        console.log("Server response:", res.data.data);
        alert("Update completed successfully");
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
  };

  return (
    <>
      <SheetContent>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>
              {mode === "add" ? "Add Admin" : "Update Admin"}
            </SheetTitle>
            {/* <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription> */}
          </SheetHeader>
          <hr />

          <div className="grid flex-1 auto-rows-min gap-6 p-4">
            <div className="grid gap-1">
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
            <div className="grid gap-1">
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

export default AdminAddAdminSheet;
