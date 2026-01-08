import React from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";


//
import axios from "axios";
import { useState, useEffect } from "react";
import { useRef } from "react";

//
import ThemeToggle from "@/components/Theme/theme-toggle";
import DoctorAddHealthData from "./DoctorAddHealthData";
function DoctorViewPatients() {
  const api_url = import.meta.env.VITE_API_URL;
  const userId = sessionStorage.getItem("user_id");
const [open, setOpen] = useState(false);

  const [patients, setPatients] = useState([]); // for dco
  const [search, setSearch] = useState(""); // for search input
  const dialogCloseRef = useRef(null); // for modal close

  const getPatients = async () => {
    try {
      const res = await axios.get(
        `${api_url}/appointment/getAppointmentPatientForDoctor/${userId}`,
        {
          withCredentials: true,
        }
      );
        console.log(res)
      setPatients(res.data.data);
    } catch (err) {
      console.error("Error loading patients", err);
    }
  };
  // load once
  useEffect(() => {
    getPatients();
  }, []);
  // console.log(doctors)
  const filter = patients.filter((d) => {
    if (d.active) {
      const matchesSearch = d.patientName
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesSearch;
    }
  });
  return (
    <>
      <div className={`flex-1 flex flex-col`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow-md  flex justify-between items-center border-b p-3">
          <div className="flex items-center space-x-2">
            {/* Hamburger for mobile */}

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 pl-4">
              Patients
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </header>
        {/* searchbar */}
        <div className="p-5 grid grid-cols-2">
          <div className="w-full max-w-md">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Search patients"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
        </div>
        {/* doctor view  */}

        <div className="p-2 ">
          <div className="bg-zinc-100 dark:bg-slate-950 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50  ">
            {filter.map((d) => (
              <div
                className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 transition-colors duration-300 rounded-sm border-2 border-gray-200 dark:border-gray-800 p-1 m-2 "
                key={d._id}
              >
                <div className="rounded-lg border-2 border-gray-200 dark:border-gray-700 p-2">
                  <span className=" mx- text-sm font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-3 py-1 rounded-full">
                    Appontments: {d.totalAppointments}
                  </span>
                  <h2 className="text-center text-lg font-semibold mt-1 text-gray-900 dark:text-white">
                    {d.patientName}
                  </h2>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {d.email}
                  </p>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {d.phone}
                  </p>

                  <div className="grid grid-cols-3 text-center mt-6 gap-5">
                    <div>
                      <p className="font-semibold text-sm text-gray-500 dark:text-gray-400">
                        Age
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                        {d.age}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-500 dark:text-gray-400">
                        Place
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                        {d.place}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-500 dark:text-gray-400">
                        Gender
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                        {d.gender}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-sm border-2 border-gray-100 dark:border-gray-800 p-1 m-1">
                    <h2 className=" text-md font-semibold mt-1 text-blue-600 dark:text-blue-400">
                      Emergancy Contact
                    </h2>
                    <div className="grid grid-cols-3 mt-2 gap-1 pl-1">
                      <div>
                        <p className="font-semibold text-sm text-gray-500 dark:text-gray-400">
                          Name
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                          {d.emergencyContactName}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-500 dark:text-gray-400">
                          Relation
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                          {d.emergencyContactRelation}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-500 dark:text-gray-400">
                          Phone
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                          {d.emergencyContactPhone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button onClick={(e) => setOpen(true) }>
                   {d.healthtable ?  "Update Health Data": "Add Health Data"}
                  </Button>
                   <DoctorAddHealthData
                      open = {open}
                      setOpen ={setOpen}
                      onUpdate={getPatients}
                      patientId= {d.patientId}
                      healthtable={d.healthtable}
                    />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorViewPatients;
