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
import { useState } from "react";
import axios from "axios";

export function PatientAddFeedback({ open, setOpen, _id, doctorId }) {
  const userId = sessionStorage.getItem("user_id");
  const api_url = import.meta.env.VITE_API_URL;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please select a rating");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        appointmentId: _id,
        doctorId,
        patientId: userId,
        rating,
        description: formData.description,
      };

      console.log("Submitting:", payload);

      await axios.post(`${api_url}/feedback/createFeedback`, payload,
        { withCredentials: true }
      );

      setOpen(false); // close modal after success
      setRating(0);
      setFormData({ description: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Feedback</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldSet>
            <FieldGroup>
              <Field>
                <Textarea
                  id="feedback"
                  placeholder="Your feedback helps us improve..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <FieldDescription>
                  Share your thoughts about our service.
                </FieldDescription>
              </Field>

              <p className="text-sm font-medium">Rate your experience</p>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="focus:outline-none"
                  >
                    <span
                      className={`text-2xl ${
                        star <= (hover || rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                {rating ? `${rating} / 5` : "No rating selected"}
              </p>
            </FieldGroup>
          </FieldSet>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={loading || rating === 0}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
