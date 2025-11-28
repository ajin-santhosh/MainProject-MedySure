import React, { useState, useEffect } from "react";
import ThemeToggle from "@/components/Theme/theme-toggle";
import DataCards from "@/components/cards/DataCards";
import axios from "axios";
import { data } from "react-router-dom";
import AppointmentPieChart from "../charts/AppointmentPieChart";
import AppointmentWeekReport from "../charts/AppointmentWeekReport";
function AdminDashBoard() {
  const api_url = import.meta.env.VITE_API_URL;
  const [totalpatients, setTotalpatients] = useState(0);
  const [totaldoctors, setTotaldoctors] = useState(0);
  const [totalappointment, setTotalappointment] = useState(0);
  const [totalfeedback, setTotalfeedback] = useState(0);
  const [totalreport, setTotalreport] = useState(0);
  const fetchCount = async () => {
    try {
      const [p_count, d_cont, a_count, f_count, r_count] = await Promise.all([
        axios.get(`${api_url}/dashboard/totalPatients`, {
          withCredentials: true,
        }),
        axios.get(`${api_url}/dashboard/totalDoctors`, {
          withCredentials: true,
        }),
        axios.get(`${api_url}/dashboard/totalappointments`, {
          withCredentials: true,
        }),
        axios.get(`${api_url}/dashboard/totalfeedback`, {
          withCredentials: true,
        }),
        axios.get(`${api_url}/dashboard/totalreports`, {
          withCredentials: true,
        }),
      ]);
      setTotalpatients(p_count.data.total);
      setTotaldoctors(d_cont.data.total);
      setTotalappointment(a_count.data.data);
      setTotalfeedback(f_count.data.data);
      setTotalreport(r_count.data.data);
    } catch (error) {
      console.error("Error in API calls for counts:", error);
    }
  };
  console.log(totalappointment)
  useEffect(() => {
    fetchCount(); // load immediately

    const interval = setInterval(() => {
      fetchCount(); // update every 5 seconds
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const totalCardData = [
    {
      id: 1,
      cardH: "Total Doctors",
      total_count: totaldoctors,
      th2: "MedySure Doctors",
      th3: "total number of doctors resgisterd so far",
    },
    {
      id: 12,
      cardH: "Total Patients",
      total_count: totalpatients,
      th2: "MedySure Patients",
      th3: "total number of Pateints resgisterd so far",
    },
    {
      id: 3,
      cardH: "Total Appointments",
      total_count: totalappointment,
      th2: "MedySure Appointments",
      th3: "total number of Appointments applied so far",
    },
    {
      id: 4,
      cardH: "Total Feedbacks",
      total_count: totalfeedback,
      th2: "MedySure Feedbacks",
      th3: "total number of Feedback resgisterd so far",
    },
    {
      id: 5,
      cardH: "Total Reports",
      total_count: totalreport,
      th2: "MedySure Reports",
      th3: "total number of Reports created so far",
    }
  ];
  return (
    <>
      <div className={`flex-1 flex flex-col`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow-md  flex justify-between items-center border-b p-3">
          <div className="flex items-center space-x-2">
            {/* Hamburger for mobile */}

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 pl-4">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4 mt-6
">
         {totalCardData.map((item) => (
        <DataCards key={item.id} data={item} />
      ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 p-4 gap-4 border m-4  shadow-xl">
        
          <div className="justify-items-center"> 
            <h2 className="font-sans text-xl font-bold text-center">Apointment Statics</h2>
                        <AppointmentPieChart />

          </div>
          <div className="justify-items-center">
                        <h2 className="font-sans text-xl font-bold text-center pt-3 pb-10">Apointments by days (Last 7 days)</h2>

          <AppointmentWeekReport />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashBoard;
