("use client");
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
// library import
import React, { useState, useEffect } from "react";
import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;
import ThemeToggle from '@/components/Theme/theme-toggle'
// logic from here
export const getColumns = (deleteReport) => [
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
  },
  {
    accessorKey: "reportType",
    header: ({ column }) => {
      const paymentOptions = ["lab report", "prescription"];
      const currentFilter = column.getFilterValue();

      return (
        <div className="flex items-center gap-2">
          {/* FILTER DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Report Type <ChevronDown className="ml-2 h-4 w-4" />
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
                  {payment}
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

    cell: ({ row }) => <div>{row.getValue("reportType")}</div>,
  },
  

  
  

  // ACTIONS COLUMN
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const reports = row.original;

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
                    onClick: () => deleteReport(reports._id),
                  },
                })
              }
            >
              Delete
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-blue-700"
              onClick={() => downloadFile(reports._id)}
            >
              {" "}
              Download
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
// download file
const downloadFile = async (reportId) => {
  try {
    const res = await axios.get(`${api_url}/report/dowReport/${reportId}`, {
      responseType: "blob", // important!
      withCredentials: true,
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: "application/pdf" })
    );

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `report_${reportId}.pdf`); // file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url); // clean up
    console.log("Download succeeded");
  } catch (err) {
    console.error("Error downloading report", err);
  }
};
function DoctorViewReports() {
     const userId = sessionStorage.getItem("user_id");

    const [data, setData] = useState([]);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
 
  // fetch report
  const repo = async () => {
    try {
      const res = await axios.get(`${api_url}/report/getReportForDoctor/${userId}`, {
        withCredentials: true,
      });
      setData(res.data.data);
    } catch (err) {
      console.error("Error loading appointments", err);
    }
  };

  // delete Appointment + reload list
  const deleteReport = async (_id) => {
    try {
      await axios.delete(`${api_url}/appointment/deleteAppointment/${_id}`, {
        withCredentials: true,
      });

      console.log("Appointment deleted:", userId);

      // re-fetch data
      repo();
    } catch (error) {
      console.error("Error deleting Appointment", error);
    }
  };

  // load once
  useEffect(() => {
    repo();
  }, []);

  const table = useReactTable({
    data,
    columns: getColumns(deleteReport),
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
                    My Reports
                  </h1>
                </div>
      
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                </div>
              </header>

             <div className="p-5 bg-zinc-100 dark:bg-slate-950">
          <div className="w-full">
            {/* FILTER BAR */}
            <div className="flex items-end py-4">
              <Input
                placeholder="Filter by patient"
                value={
                  table.getColumn("patientName")?.getFilterValue() ||
                  ""
                }
                onChange={(e) =>
                  table
                    .getColumn("patientName",)
                    ?.setFilterValue(e.target.value)
                }
                className="max-w-sm"
              />

              {/* <ButtonGroup className="pl-5">
                <Button variant="outline">Export CSV</Button>
                <ButtonGroupSeparator />
                <Button size="icon" variant="outline">
                  <FileSpreadsheet />
                </Button>
              </ButtonGroup> */}

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
   </>  )
}

export default DoctorViewReports