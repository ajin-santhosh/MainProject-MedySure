import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
function DoctorAddNotes({ open, setOpen, appointmentId,existingNotes,onUpdate }) {
    const api_url = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
    note: "",
  });
  const [loading, setLoading] = useState(false);
 useEffect(() => {
    if (open) {
      setFormData({
        note: existingNotes || "", // add OR update
      });
    }
  }, [open, existingNotes]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        notes: formData.note,
      };

      console.log("Submitting:", payload);

      await axios.patch(`${api_url}/appointment/doctorAddNotes/${appointmentId}`, payload,
        { withCredentials: true }
      );
       console.log("succes")
      setOpen(false); // close modal after success
      setFormData({ note: "" });
      onUpdate()
    } catch (error) {
      console.error(error);
      alert("Failed to submit notes");
    } finally {
      setLoading(false);
    }
  };
  return (
<Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Notes for Patient</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldSet>
            <FieldGroup>
              <Field>
                <Textarea
                  id="note"
                  placeholder="add notes for patient"
                  rows={4}
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                />
                <FieldDescription>
                 Share your quick guide to help patient
                </FieldDescription>
              </Field>

            </FieldGroup>
          </FieldSet>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={loading }>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>  )
}

export default DoctorAddNotes