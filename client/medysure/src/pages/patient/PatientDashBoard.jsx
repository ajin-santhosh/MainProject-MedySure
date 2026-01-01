import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

import ThemeToggle from '@/components/Theme/theme-toggle'
import DataCards from '@/components/cards/DataCards'
import AppointmentByPatientPieChart from '../charts/AppointmentByPatientPieChart';
import AppointmentWeekReport from "../charts/AppointmentWeekReport";
function PatientDashBoard() {


    const id = sessionStorage.getItem("user_id");
    const api_url = import.meta.env.VITE_API_URL;
  const [totalappointment, setTotalappointment] = useState(0);
  const [totalfeedback, setTotalfeedback] = useState(0);
  const [totalreport, setTotalreport] = useState(0);
  const fetchCount = async () => {
    try {
      const [ a_count, f_count, r_count] =
        await Promise.all([
          axios.get(`${api_url}/dashboard/totalAppointmentByPatient/${id}`, {
            withCredentials: true,
          }),
          axios.get(`${api_url}/dashboard/totalFeedbackByPatient/${id}`, {
            withCredentials: true,
          }),
          axios.get(`${api_url}/dashboard/totalReportsByPatient/${id}`, {
            withCredentials: true,
          }),
          ]);
      setTotalappointment(a_count.data.data);
      setTotalfeedback(f_count.data.data);
      setTotalreport(r_count.data.data);
    } catch (error) {
      console.error("Error in API calls for counts:", error);
    }
  };
//   console.log(totalappointment);
  useEffect(() => {
    fetchCount(); // load immediately
    fetchStatus()
    const interval = setInterval(() => {
        fetchStatus()
      fetchCount(); // update every 5 seconds
    }, 20000);

    return () => clearInterval(interval);
  }, []);
const userId = sessionStorage.getItem("user_id");
  
    const [res, setRes] = useState([]);
    const fetchStatus = async () => {
      try {
        const result = await axios.get(
          `${api_url}/dashboard/patientAppintmentStatusReport/${userId}`,
          { withCredentials: true }
        );
  
        console.log("STATUS DATA:", result.data.status);  // logs only once
  
        setRes(result.data.status);
      } catch (error) {
        console.error("Error in API calls for patient appointment status:", error);
      }
    };

    
    const totalCardData = [
    
    {
      id: 1,
      cardH: "Total Appointments",
      total_count: totalappointment,
      th2: "MedySure Appointments",
      th3: "total number of Appointments applied you have",
    },
    {
      id: 2,
      cardH: "Total Feedbacks",
      total_count: totalfeedback,
      th2: "MedySure Feedbacks",
      th3: "total number of Feedbacks you have added",
    },
    {
      id: 3,
      cardH: "Total Reports",
      total_count: totalreport,
      th2: "MedySure Reports",
      th3: "total number of Reports generated",
    },
     {
      id: 4,
      cardH: "Total Payments",
      total_count: 3,
      th2: "MedySure Payments",
      th3: "total number of Payments you paid",
    },
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
           <div
          className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4 mt-6
"
        >
          {totalCardData.map((item) => (
            <DataCards key={item.id} data={item} />
          ))}
        </div>

        <h3 className=" text-xl font-bold pl-4 pt-4 font-pfont_2 ">
          {" "}
          Appintment Dashboard
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 p-4 gap-4 border m-4 shadow-lg bg-white dark:bg-gray-800">
          <div className="justify-items-center">
            <h2 className="font-sans text-xl font-bold text-center">
              Appointment Statics
            </h2>
            <AppointmentByPatientPieChart res= {res} />
          </div>
          
           <div className="justify-items-center ">
            <h2 className="font-sans text-xl font-bold text-center pt-3 pb-5">
              {" "}
              Appointments
            </h2>
            <div className="border shadow-xl rounded-sm p-4 bg-white dark:bg-gray-950 hover:shadow-2xl transition-shadow duration-300 w-1/2 ">
              {/* <h2 className="text-2xl font-bold font-sans underline decoration-gray-300 mb-4 text-center">
                Patients Count
              </h2> */}

              <div className="grid gap-1">
                 {res.map((entry) => (
                <div className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm">
                  <span>
                    {/* <ShieldCheck /> */}
                  </span>
                  <p className="text-md font-medium p-1 "> {entry._id}: {entry.total}</p>
                  <span className="text-xl font-bold">
                    {/* {totalactivepatient} */}
                  </span>
                </div>
                ))}

                
                
              </div>
              
            </div>
            
            
          </div>
          
        </div>


          </div>
</>  )
}

export default PatientDashBoard