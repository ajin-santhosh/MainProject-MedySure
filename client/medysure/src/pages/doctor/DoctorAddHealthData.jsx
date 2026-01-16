import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { useEffect, useState } from "react";
import axios from "axios";
function DoctorAddHealthData({
  open,
  setOpen,
  patientId,
  onUpdate,
  healthtable,
}) {
  const api_url = import.meta.env.VITE_API_URL;
  const userId = sessionStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    Blood_pressure: "",
    Heart_rate: "",
    Body_temperature: "",
    Respiratory_rate: "",
    Oxygen_saturation: "",
    Blood_sugar: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔑 prevent default form submission

    try {
      setLoading(true);

      if (healthtable) {
        // UPDATE branch
        const payload = {
          patientId,
          doctorId: userId,
          Blood_pressure: formData.Blood_pressure,
          Heart_rate: formData.Heart_rate,
          Body_temperature: formData.Body_temperature,
          Respiratory_rate: formData.Respiratory_rate,
          Oxygen_saturation: formData.Oxygen_saturation,
          Blood_sugar: formData.Blood_sugar,
        };
        // console.log("Update logic here, healthtable ID:", healthtable);
        // If you implement update API later:
        await axios.put(
          `${api_url}/health/updateHealthTable/${healthtable}`,
          payload,
          { withCredentials: true }
        );
        toast.success("Health Data Updated Successfully");
      } else {
        // ADD branch
        const payload = {
          patientId,
          Blood_pressure: formData.Blood_pressure,
          Heart_rate: formData.Heart_rate,
          Body_temperature: formData.Body_temperature,
          Respiratory_rate: formData.Respiratory_rate,
          Oxygen_saturation: formData.Oxygen_saturation,
          Blood_sugar: formData.Blood_sugar,
        };
        await axios.post(
          `${api_url}/health/createHealthTable/${userId}`,
          payload,
          { withCredentials: true }
        );
        toast.success("Health Data Added Successfully");
      }

      onUpdate?.(); // refresh parent data
      setOpen(false); // close modal
    } catch (error) {
      console.error(error);
      alert("Failed to save health card");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">Health Card</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* All your input fields here */}
          <FieldSet>
            <FieldGroup>
              <Field>
                <Label htmlFor="Blood_pressure">Blood Pressure</Label>
                <Input
                  id="Blood_pressure"
                  placeholder="Blood Pressure 00/00"
                  value={formData.Blood_pressure}
                  onChange={(e) =>
                    setFormData({ ...formData, Blood_pressure: e.target.value })
                  }
                />
                <Label htmlFor="Heart_rate">Heart Rate</Label>
                <Input
                  id="Heart_rate"
                  placeholder="Heart rate"
                  value={formData.Heart_rate}
                  onChange={(e) =>
                    setFormData({ ...formData, Heart_rate: e.target.value })
                  }
                />
                <Label htmlFor="Body_temperature">Body Temperature</Label>
                <Input
                  id="Body_temperature"
                  placeholder="Body temperature"
                  value={formData.Body_temperature}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Body_temperature: e.target.value,
                    })
                  }
                />
                <Label htmlFor="Respiratory_rate">Respiratory Rate</Label>
                <Input
                  id="Respiratory_rate"
                  placeholder="Respiratory rate"
                  value={formData.Respiratory_rate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Respiratory_rate: e.target.value,
                    })
                  }
                />
                <Label htmlFor="Oxygen_saturation">Oxygen Saturation</Label>
                <Input
                  id="Oxygen_saturation"
                  placeholder="Oxygen saturation"
                  value={formData.Oxygen_saturation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Oxygen_saturation: e.target.value,
                    })
                  }
                />
                <Label htmlFor="Blood_sugar">Blood Sugar</Label>
                <Input
                  id="Blood_sugar"
                  placeholder="Blood sugar"
                  value={formData.Blood_sugar}
                  onChange={(e) =>
                    setFormData({ ...formData, Blood_sugar: e.target.value })
                  }
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={loading}>
              {loading
                ? healthtable
                  ? "Updating..."
                  : "Adding..."
                : healthtable
                ? "Update"
                : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DoctorAddHealthData;
