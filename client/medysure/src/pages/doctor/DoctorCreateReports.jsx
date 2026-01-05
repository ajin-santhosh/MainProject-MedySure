import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import {
 Plus,X
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

function DoctorCreateReports({ open, setOpen, patientId, onUpdate }) {
  const api_url = import.meta.env.VITE_API_URL;
    const doctorId = sessionStorage.getItem("user_id");

  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    prescription: "",
  });

  const [tableData, setTableData] = useState([
    {
      testName: "",
      result: "",
      unit: "",
      reference: "",
    },
  ]);

  // Handle lab table input
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setTableData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const addRow = () => {
    setTableData((prev) => [
      ...prev,
      { testName: "", result: "", unit: "", reference: "" },
    ]);
  };

  const removeRow = (index) => {
    setTableData((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setType("");
    setFormData({ title: "", prescription: "" });
    setTableData([
      { testName: "", result: "", unit: "", reference: "" },
    ]);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (type === "lab report") {
        const isValid = tableData.every(
          (row) =>
            row.testName &&
            row.result &&
            row.unit &&
            row.reference
        );

        if (!formData.title || !isValid) {
          alert("Please fill all lab report fields");
          return;
        }

        await axios.post(
          `${api_url}/report/createReport`,
          {
            title: formData.title,
            tableData,
            patientId,
            doctorId,
          },
          { withCredentials: true }
        );
      }

      if (type === "prescription") {
        if (!formData.title || !formData.prescription) {
          alert("Please fill prescription details");
          return;
        }

        await axios.post(
          `${api_url}/report/createPrescription`,
          {
            title: formData.title,
            prescription:formData.prescription,
            patientId,
            doctorId,
          },
          { withCredentials: true }
        );
      }

      setOpen(false);
      onUpdate();
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle>Send Report For Patient</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldSet>
            <FieldGroup>
              <Field>
                {/* TITLE */}
                <Textarea
                  placeholder="Add title"
                  rows={2}
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />

               {/* LAB REPORT */}
{type === "lab report" && (
  <div className="space-y-3 max-h-96 overflow-y-auto">
    {tableData.map((row, index) => (
      <div
        key={index}
        className="
          grid grid-cols-1 gap-2 p-3 border rounded
          sm:grid-cols-2 sm:gap-3
          lg:grid-cols-[2fr_1fr_1fr_2fr_auto] lg:gap-3
          items-center
        "
      >
        <input
          name="testName"
          placeholder="Test Name"
          value={row.testName}
          onChange={(e) => handleChange(index, e)}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          name="result"
          placeholder="Result"
          value={row.result}
          onChange={(e) => handleChange(index, e)}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          name="unit"
          placeholder="Unit"
          value={row.unit}
          onChange={(e) => handleChange(index, e)}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          name="reference"
          placeholder="Reference Range"
          value={row.reference}
          onChange={(e) => handleChange(index, e)}
          className="border rounded px-3 py-2 w-full"
        />
        <button
          type="button"
          onClick={() => removeRow(index)}
          disabled={tableData.length === 1}
          className="text-red-500 hover:text-red-700 disabled:opacity-40 disabled:cursor-not-allowed justify-self-end"
        >
          <X />
        </button>
      </div>
    ))}

    <Button type="button" onClick={addRow} className="mt-2">
      Add Test <Plus />
    </Button>
  </div>
)}


{/* PRESCRIPTION */}
{type === "prescription" && (
  <Textarea
    placeholder="Write prescription details..."
    rows={5}
    value={formData.prescription}
    onChange={(e) =>
      setFormData({ ...formData, prescription: e.target.value })
    }
    className="w-full"
  />
)}


                {/* TYPE SELECT */}
                <div>
                  <label className="text-sm font-medium">Report type</label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prescription">
                        Prescription
                      </SelectItem>
                      <SelectItem value="lab report">
                        Lab report
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <FieldDescription>
                  Patient medical report from doctor
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

            <Button type="submit" disabled={loading || !type}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DoctorCreateReports;
