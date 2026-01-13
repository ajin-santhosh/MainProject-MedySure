import React, { useState, useEffect } from "react";
import axios from "axios";
("use client");
import { Mail, User, Shield } from "lucide-react";
import ThemeToggle from "@/components/Theme/theme-toggle";
import PatientUpdate from "./PatientUpdate";
import PatientUpdateEmegencyContact from "./PatientUpdateEmegencyContact";
function PatientProfile() {
  const userId = sessionStorage.getItem("user_id");
  const api_url = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState([]);
const [isProfileOpen, setIsProfileOpen] = useState(false);
const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const getPatient = async () => {
    try {
      const res = await axios.get(
        `${api_url}/patient/getPatientById/${userId}`,
        {
          withCredentials: true,
        }
      );
      setUser(res.data.data);
      console.log(user);
    } catch (err) {
      console.error("Error loading patient", err);
    }
  };
  useEffect(() => {
    getPatient();
  }, []);
  return (
    <>
      <div className={`flex-1 flex flex-col`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow-md  flex justify-between items-center border-b p-3">
          <div className="flex items-center space-x-2">
            {/* Hamburger for mobile */}

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 pl-4">
              Profile{" "}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </header>
        {/* jadkj */}
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-5">
          <div className="w-full max-w rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
            {/* Header */}
            <div className="flex flex-col items-center gap-3 p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="h-20 w-20 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-3xl font-semibold ">
                {user.firstName}
              </div>
              <h2 className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                User Profile
              </span>
            </div>

            {/* Info */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {user.firstName} {user.lastName}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {user.email}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  Patient:
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {user.active ? "Active" : "InActive"}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Phone:
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {user.phone}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Age:
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {user.age}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Gender:
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {user.gender}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Palce:
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {user.place}
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Blood group:
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {user.blood_group}
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Hieght:
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {user.height}
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Weight:
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {user.weight}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                className="flex-1 rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                onClick={() => setIsProfileOpen(true)}
              >
                Edit Profile
              </button>
              <PatientUpdate
              isOpen={isProfileOpen}
    onClose={() => setIsProfileOpen(false)}
                initialData={user}
                onUpdate={getPatient}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </PatientUpdate>
              
              <button className="bg-gray-400 dark:bg-gray-600 flex-1 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
               onClick={() => setIsEmergencyOpen(true)}
               >
                Update Emergancy Contact
              </button>
              <PatientUpdateEmegencyContact
                isOpen={isEmergencyOpen}
    onClose={() => setIsEmergencyOpen(false)}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </PatientUpdateEmegencyContact>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientProfile;
