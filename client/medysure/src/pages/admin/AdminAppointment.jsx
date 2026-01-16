("use client");
// // component import

import { toast } from "sonner";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { UserRoundPlus, FileSpreadsheet } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

//pages import
// import { Sample } from "./Sample";
import ThemeToggle from "@/components/Theme/theme-toggle";

// library import
import React, { useState, useEffect } from "react";
import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;

// logic from here
export const getColumns = (deleteAppointment) => [
  {
    accessorKey: "_id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      const statusOptions = [
        "pending",
        "scheduled",
        "rescheduled",
        "cancelled",
        "completed",
      ];
      const currentFilter = column.getFilterValue();

      return (
        <div className="flex items-center gap-2">
          {/* FILTER DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {statusOptions.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={currentFilter === status}
                  onCheckedChange={(selected) => {
                    if (selected) {
                      column.setFilterValue(status);
                    } else {
                      column.setFilterValue(undefined);
                    }
                  }}
                  className="capitalize"
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}

              {/* CLEAR FILTER */}
              <DropdownMenuCheckboxItem
                checked={!currentFilter}
                onCheckedChange={() => column.setFilterValue(undefined)}
              >
                Clear Filter
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* SORT BUTTON */}
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },

    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },

  {
    accessorKey: "patientName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Patient Name <ArrowUpDown className="ml-1 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("patientName")}</div>,
  },

  {
    accessorKey: "doctorName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Doctor Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("doctorName")}</div>,
  },

  {
    accessorKey: "doctorDepartment",
    header: ({ column }) => {
      const departmentOptions = [
        "generalMedicine",
        "pediatrics",
        "gynecology",
        "cardiology",
        "dermatology",
        "orthopedics",
        "neurology",
      ];
      const currentFilter = column.getFilterValue();

      return (
        <div className="flex items-center gap-2">
          {/* FILTER DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Department <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {departmentOptions.map((department) => (
                <DropdownMenuCheckboxItem
                  key={department}
                  checked={currentFilter === department}
                  onCheckedChange={(selected) => {
                    if (selected) {
                      column.setFilterValue(department);
                    } else {
                      column.setFilterValue(undefined);
                    }
                  }}
                  className="capitalize"
                >
                  {department}
                </DropdownMenuCheckboxItem>
              ))}

              {/* CLEAR FILTER */}
              <DropdownMenuCheckboxItem
                checked={!currentFilter}
                onCheckedChange={() => column.setFilterValue(undefined)}
              >
                Clear Filter
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* SORT BUTTON */}
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue("doctorDepartment")}</div>,
  },

  {
    accessorKey: "appointmentDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Appointment Date <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("appointmentDate")}</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Description <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Notes <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("notes")}</div>,
  },
  {
    accessorKey: "payment",
    header: ({ column }) => {
      const paymentOptions = [true, false];
      const currentFilter = column.getFilterValue();

      return (
        <div className="flex items-center gap-2">
          {/* FILTER DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Payment <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {paymentOptions.map((payment) => (
                <DropdownMenuCheckboxItem
                  key={payment}
                  checked={currentFilter === payment}
                  onCheckedChange={(selected) => {
                    if (selected) {
                      column.setFilterValue(payment);
                    } else {
                      column.setFilterValue(undefined);
                    }
                  }}
                  className="capitalize"
                >
                  {payment ? "Yes" : "No"}
                </DropdownMenuCheckboxItem>
              ))}

              {/* CLEAR FILTER */}
              <DropdownMenuCheckboxItem
                checked={!currentFilter}
                onCheckedChange={() => column.setFilterValue(undefined)}
              >
                Clear Filter
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* SORT BUTTON */}
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },

    cell: ({ row }) => <div>{row.getValue("payment") ? "Yes" : "No"}</div>,
  },

  // ACTIONS COLUMN
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              className="text-red-700"
              onClick={() =>
                toast.warning("Delete Appointment?", {
                  description: "This action cannot be undone.",
                  action: {
                    label: "Confirm",
                    onClick: () => deleteAppointment(appointment._id),
                  },
                  cancel: {
                    label: "Cancel",
                    // onClick: () => console.log("Cancelled"),
                  },
                })
              }
            >
              Delete
            </DropdownMenuItem>

            {/* <DropdownMenuItem
              className="text-blue-700"
              onClick={() => navigator.clipboard.writeText(doctor.email)}
            >
              Copy Email
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
function AdminAppointment() {
  const [data, setData] = useState([]);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  // fetch appoointments
  const apm = async () => {
    try {
      const res = await axios.get(`${api_url}/appointment/getAppointment`, {
        withCredentials: true,
      });
      setData(res.data.data);
    } catch (err) {
      console.error("Error loading appointments", err);
    }
  };

  // delete Appointment + reload list
  const deleteAppointment = async (_id) => {
    try {
      await axios.delete(`${api_url}/appointment/deleteAppointment/${_id}`, {
        withCredentials: true,
      });
      toast.success("Appointment Deleted Successfully");

      // console.log("Appointment deleted:", userId);

      // re-fetch data
      apm();
    } catch (error) {
      console.error("Error deleting Appointment", error);
    }
  };
  const exportAppointment = async () => {
    try {
      const response = await axios.get(
        `${api_url}/admin/export-appointmentData`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );
      toast.success("Appointment Data Fetched Successfully");

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Appointments.csv");

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error in  export data fetch", error);
    }
  };
  // load once
  useEffect(() => {
    apm();
  }, []);

  const table = useReactTable({
    data,
    columns: getColumns(deleteAppointment),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <>
      <div className={`flex-1 flex flex-col`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow-md  flex justify-between items-center border-b p-3">
          <div className="flex items-center space-x-2">
            {/* Hamburger for mobile */}

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 pl-4">
              Appointments
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </header>
        <div className="p-3">
          <div className="p-2 w-full bg-zinc-100 dark:bg-slate-950">
            {/* FILTER BAR */}
            <div className="flex items-end py-4">
              <Input
                placeholder="Filter by names"
                value={
                  table.getColumn("patientName")?.getFilterValue() ||
                  table.getColumn("doctorName")?.getFilterValue() ||
                  ""
                }
                onChange={(e) =>
                  table
                    .getColumn("patientName", "doctorName")
                    ?.setFilterValue(e.target.value)
                }
                className="max-w-sm"
              />

              <ButtonGroup className="pl-5">
                <Button variant="outline" onClick={exportAppointment}>
                  Export CSV
                </Button>
                <ButtonGroupSeparator />
                <Button size="icon" variant="outline">
                  <FileSpreadsheet />
                </Button>
              </ButtonGroup>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((c) => c.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                        className="capitalize"
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((group) => (
                    <TableRow key={group.id}>
                      {group.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="100%" className="text-center h-24">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAppointment;
