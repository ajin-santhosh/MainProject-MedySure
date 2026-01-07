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

  onUpdate,
}) {
  const api_url = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    Blood_pressure: "",
    Heart_rate: "",
    Body_temperature:"",
    Respiratory_rate:"",
    Oxygen_saturation:"",
    Blood_sugar:""
  });
  const [loading, setLoading] = useState(false);

  // ✅ Prefill existing values
  //   useEffect(() => {
  //     if (open && existingDate && existingStatus) {
  //       const d = new Date(existingDate);
  //       setDate(d);
  //       setTime(d.toTimeString().slice(0, 5)); // HH:mm
  //       setStatus(existingStatus || "");
  //     }
  //   }, [open, existingDate, existingStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.patch(
        `${api_url}/appointment/doctorUpdateAppointment/${appointmentId}`,
        {
          appointmentDate: finalDate,
        },
        { withCredentials: true }
      );

      onUpdate?.();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update appointment");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">Health Card </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldSet>
            <FieldGroup>
              <Field>
                <Label htmlFor="Blood_pressure"> Blood Pressure</Label>
                <Input
                  id="Blood_pressure"
                  placeholder="Blood Pressure"
                  value={formData.Blood_pressure}
                  onChange={(e) =>
                    setFormData({ ...formData, Blood_pressure: e.target.value })
                  }
                />
                <Label htmlFor="Heart_rate"> Heart Rrate</Label>
                <Input
                  id="Heart_rate"
                  placeholder="Heart_rate"
                  
                  value={formData.Heart_rate}
                  onChange={(e) =>
                    setFormData({ ...formData, Heart_rate: e.target.value })
                  }
                />
                <Label htmlFor="Body_temperature">Body Temperature  </Label>
                <Input
                  id="Body_temperature"
                  placeholder="Body temperature "
                  value={formData.Body_temperature}
                  onChange={(e) =>
                    setFormData({ ...formData, Body_temperature: e.target.value })
                  }
                />
                <Label htmlFor="Respiratory_rate"> Respiratory Rate  </Label>
                <Input
                  id="Respiratory_rate"
                  placeholder=" Respiratory_rate "
                  value={formData.Respiratory_rate}
                  onChange={(e) =>
                    setFormData({ ...formData, Respiratory_rate: e.target.value })
                  }
                />
                <Label htmlFor="Oxygen_saturation">  Oxygen Saturation  </Label>
                <Input
                  id="Oxygen_saturation"
                  placeholder=" Oxygen_saturation "
                  value={formData.Oxygen_saturation}
                  onChange={(e) =>
                    setFormData({ ...formData, Oxygen_saturation: e.target.value })
                  }
                />
                <Label htmlFor="Blood_sugar">   Blood Sugar  </Label>
                <Input
                  id="Blood_sugar"
                  placeholder=" Blood_sugar "
                  value={formData.Blood_sugar}
                  onChange={(e) =>
                    setFormData({ ...formData, Blood_sugar: e.target.value })
                  }
                />
                <FieldDescription>
                  ...
                </FieldDescription>
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
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DoctorAddHealthData;
