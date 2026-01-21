import React, { useState, useEffect } from "react";
import ThemeToggle from "@/components/Theme/theme-toggle";
import DataCards from "@/components/cards/DataCards";
import axios from "axios";
import { data } from "react-router-dom";
import { ShieldCheck, ShieldOff } from "lucide-react";
import AppointmentPieChart from "../charts/AppointmentPieChart";
import AppointmentWeekReport from "../charts/AppointmentWeekReport";
import PatientChart from "../charts/PatientChart";
function AdminDashBoard() {
  const api_url = import.meta.env.VITE_API_URL;
  const [totalpatients, setTotalpatients] = useState(0);
  const [totaldoctors, setTotaldoctors] = useState(0);
  const [totalappointment, setTotalappointment] = useState(0);
  const [totalfeedback, setTotalfeedback] = useState(0);
  const [totalreport, setTotalreport] = useState(0);
  const [totalactivepatient, setTotalactivepatient] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0)
  const [res1, setRes1] = useState([]);
  const [res2, setRes2] = useState([]);
  const [res3, setRes3] = useState([]);

  const fetchCount = async () => {
    try {
      const [p_count, d_cont, a_count, f_count, r_count, p_status_count,pay_count] =
        await Promise.all([
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
          axios.get(`${api_url}/dashboard/acivePatientCount`,{withCredentials: true,}),
          axios.get(`${api_url}/dashboard/totalPayment`, {
            withCredentials: true,
          }),
        ]);
      setTotalpatients(p_count.data.total);
      setTotaldoctors(d_cont.data.total);
      setTotalappointment(a_count.data.data);
      setTotalfeedback(f_count.data.data);
      setTotalreport(r_count.data.data);
      setTotalactivepatient(p_status_count.data.total);
      setPaymentCount(pay_count.data.data)
    } catch (error) {
      console.error("Error in API calls for counts:", error);
    }
  };
  // console.log(totalappointment);
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
    },
    {
      id: 6,
      cardH: "Total Payments",
      total_count: paymentCount,
      th2: "MedySure Reports",
      th3: "total number of Payments done so far",
    },
  ];
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const [result1, result2,result3] = await Promise.all([
          axios.get(`${api_url}/dashboard/appintmentStatusReport`, {
            withCredentials: true,
          }),
          axios.get(`${api_url}/dashboard/appointmentWeekReport`, {
            withCredentials: true,
          }),
          axios.get(`${api_url}/dashboard/paymentWeekReport`, {
            withCredentials: true,
          }),
        ]);

        // console.log("STATUS DATA2:", result2.data.data);  // logs only once
        setRes1(result1.data.status);
        setRes2(result2.data.data);
        setRes3(result3.data.data);

      } catch (error) {
        console.error("Error in API calls for appointment status:", error);
      }
    };

    fetchStatus();
  }, []);
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4 mt-6
"
        >
          {totalCardData.map((item) => (
            <DataCards key={item.id} data={item} />
          ))}
        </div>
        {/* Appintment dashboard */}
        <h3 className=" text-xl font-bold pl-4 pt-4 font-pfont_2 ">
          {" "}
          Appintment Dashboard
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 p-4 gap-4 border m-4 shadow-lg bg-white dark:bg-gray-800">
          <div className="justify-items-center">
            <h2 className="font-sans text-xl font-bold text-center">
              Appointment Statics
            </h2>
            <AppointmentPieChart items={res1} />
          </div>
          <div className="justify-items-center">
            <h2 className="font-sans text-xl font-bold text-center pt-3 pb-10">
              Appointments by days (Last 7 days)
            </h2>

            <AppointmentWeekReport items={res2} />
          </div>
        </div>
        {/* Patient dashboard */}
        <h3 className="font-sans text-xl font-bold pl-4 pt-4 font-pfont_2">
          {" "}
          Patient Dashboard
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 p-4 gap-4 border m-4 shadow-lg bg-white dark:bg-gray-800">
          <div className="justify-items-center">
            <h2 className="font-sans text-xl font-bold text-center">
              Patient Registration Statics (Last 7 days)
            </h2>
            <PatientChart />
          </div>
          <div className="justify-items-center ">
            <h2 className="font-sans text-xl font-bold text-center pt-3 pb-10">
              {" "}
              Patient Count
            </h2>
            <div className="border shadow-xl rounded-sm p-6 bg-white dark:bg-gray-950 hover:shadow-2xl transition-shadow duration-300 w-1/2 ">
              {/* <h2 className="text-2xl font-bold font-sans underline decoration-gray-300 mb-4 text-center">
                Patients Count
              </h2> */}

              <div className="grid gap-4 mt-4">
                <div className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                  <span>
                    <ShieldCheck />
                  </span>
                  <p className="text-lg font-medium p-1 ">Active Patients:</p>
                  <span className="text-xl font-bold">
                    {totalactivepatient}
                  </span>
                </div>

                <div className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                  <span>
                    <ShieldOff />
                  </span>
                  <p className="text-lg font-medium p-1">Inactive Patients:</p>
                  <span className="text-xl font-bold">
                    {totalpatients - totalactivepatient}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className=" text-xl font-bold pl-4 pt-4 font-pfont_2 ">
          {" "}
          Payment Dashboard
        </h3>
        <div className="grid grid-cols-1 p-4 gap-4 border m-4 shadow-lg bg-white dark:bg-gray-800">
         
          <div className="">
            <h2 className="font-sans text-xl font-bold text-center pt-3 pb-10">
              Payment by days (Last 7 days)
            </h2>

            <AppointmentWeekReport items={res3} />
          </div>
        </div>
        {/*   patient dashboard end */}
      </div>
    </>
  );
}

export default AdminDashBoard;
