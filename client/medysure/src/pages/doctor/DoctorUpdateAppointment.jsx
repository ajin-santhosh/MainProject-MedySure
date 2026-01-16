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
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
function DoctorUpdateAppointment({
  open,
  setOpen,
  appointmentId,
  existingDate,
  existingStatus,
  onUpdate,
}) {
  const api_url = import.meta.env.VITE_API_URL;

  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Prefill existing values
  useEffect(() => {
    if (open && existingDate && existingStatus) {
      const d = new Date(existingDate);
      setDate(d);
      setTime(d.toTimeString().slice(0, 5)); // HH:mm
      setStatus(existingStatus || "");
    }
  }, [open, existingDate, existingStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time || !status) {
      alert("Please select date, time and status");
      return;
    }

    // ✅ Combine date + time
    const [hours, minutes] = time.split(":");
    const finalDate = new Date(date);
    finalDate.setHours(hours, minutes);

    try {
      setLoading(true);

      await axios.patch(
        `${api_url}/appointment/doctorUpdateAppointment/${appointmentId}`,
        {
          appointmentDate: finalDate,
          status,
        },
        { withCredentials: true }
      );
      toast.success("Appointment Updated Successfully");
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
          <DialogTitle>Update Appointment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 📅 Calendar */}
          <div>
            <label className="text-sm font-medium">Appointment Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>

          {/* ⏰ Time */}
          <div>
            <label className="text-sm font-medium">Time</label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {/* 📌 Status */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="rescheduled">Rescheduled</SelectItem>
                <SelectItem value="cancelled"> Cancelled</SelectItem>
                <SelectItem value="completed"> Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
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

export default DoctorUpdateAppointment;
