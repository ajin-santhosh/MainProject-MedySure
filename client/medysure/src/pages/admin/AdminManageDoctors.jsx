
("use client");
// component import
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
import { AdminAddDoctorSheet } from "./AdminAddDoctorSheet";

// library import
import React, { useState, useEffect } from "react";
import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;

// logic from here
export const getColumns = (deleteDoctor) => [
  {
    accessorKey: "userId",
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
    accessorKey: "active",
    header: ({ column }) => {
    const activeOptions = [true,false];
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
            {activeOptions.map((active) => (
              <DropdownMenuCheckboxItem
                key={active}
                checked={currentFilter === active}
                onCheckedChange={(selected) => {
                  if (selected) {
                    column.setFilterValue(active);
                  } else {
                    column.setFilterValue(undefined);
                  }
                }}
                className="capitalize"
              >
                {active?"acitve": "inactive"}
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
    
    cell: ({ row }) => <div>{row.getValue("active")?"active":"in active"}</div>,
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email <ArrowUpDown className="ml-1 h-4 w-4" />
      </Button>
      
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },

  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        First Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
  },

  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
  },

  {
  accessorKey: "gender",
  header: ({ column }) => {
    const genderOptions = ["male", "female", "other"];
    const currentFilter = column.getFilterValue();

    return (
      <div className="flex items-center gap-2">
        {/* FILTER DROPDOWN */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Gender <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {genderOptions.map((gender) => (
              <DropdownMenuCheckboxItem
                key={gender}
                checked={currentFilter === gender}
                onCheckedChange={(selected) => {
                  if (selected) {
                    column.setFilterValue(gender);
                  } else {
                    column.setFilterValue(undefined);
                  }
                }}
                className="capitalize"
              >
                {gender}
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
  cell: ({ row }) => <div>{row.getValue("gender")}</div>,
},


  {
    accessorKey: "experiance",
   header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Experiance<ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("experiance")}</div>,
  },

  {
    accessorKey: "department",
    header: ({ column }) => {
    const departmentOptions = ["generalMedicine","pediatrics","gynecology","cardiology","dermatology","orthopedics","neurology"];
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
    cell: ({ row }) => <div>{row.getValue("department")}</div>,
  },

  {
    accessorKey: "qualification",
    header: "Qualification",
    cell: ({ row }) => <div>{row.getValue("qualification")}</div>,
  },

  // ACTIONS COLUMN
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const doctor = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Sheet>
              <SheetTrigger asChild>
                
                  <DropdownMenuItem className="text-green-700"
                    onSelect={(e) => e.preventDefault()}>
                    Update
                  </DropdownMenuItem>
                
              </SheetTrigger  >
              <AdminAddDoctorSheet mode="update" 
                initialData={doctor} />
            </Sheet>

            <DropdownMenuItem
              className="text-red-700"
              onClick={() =>
                toast.warning("Delete doctor?", {
                  description: "This action cannot be undone.",
                  action: {
                    label: "Confirm",
                    onClick: () => deleteDoctor(doctor.userId),
                  },
                })
              }
            >
              Delete
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-blue-700"
              onClick={() => navigator.clipboard.writeText(doctor.email)}
            >
              Copy Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function AdminManageDoctors() {
  const [data, setData] = useState([]);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  // fetch doctors
  const doc = async () => {
    try {
      const res = await axios.get(`${api_url}/doctor/getdoctor`, {
        withCredentials: true,
      });
      setData(res.data.data);
    } catch (err) {
      console.error("Error loading doctors", err);
    }
  };

  // delete doctor + reload list
  const deleteDoctor = async (userId) => {
    try {
      await axios.delete(`${api_url}/doctor/deleteDoctor/${userId}`, {
        withCredentials: true,
      });

      console.log("Doctor deleted:", userId);

      // re-fetch data
      doc();
    } catch (error) {
      console.error("Error deleting doctor", error);
    }
  };

  // load once
  useEffect(() => {
    doc();
  }, []);

  const table = useReactTable({
    data,
    columns: getColumns(deleteDoctor),
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
              Doctors
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </header>
        <div className="p-3 ">
          <div className="p-2 w-full bg-zinc-100 dark:bg-slate-950">
            {/* FILTER BAR */}
            <div className="flex items-end py-4">
              <Input
                placeholder="Filter emails..."
                value={table.getColumn("email")?.getFilterValue() || ""}
                onChange={(e) =>
                  table.getColumn("email")?.setFilterValue(e.target.value)
                }
                className="max-w-sm"
              />

              <ButtonGroup className="pl-5">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Add Doctor</Button>
                  </SheetTrigger>
                  <AdminAddDoctorSheet  />
                </Sheet>
                <ButtonGroupSeparator />
                <Button size="icon" variant="outline">
                  <UserRoundPlus />
                </Button>
              </ButtonGroup>

              <ButtonGroup className="pl-5">
                <Button variant="outline">Export CSV</Button>
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

export default AdminManageDoctors;
