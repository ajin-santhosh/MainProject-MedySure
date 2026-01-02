import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HeartPulse,
  Thermometer,
  Activity,
  Droplets,
  Calendar,
  Pill,
  AlertTriangle,
  ScanHeart,
  HandHeart,
} from "lucide-react";

import ThemeToggle from "@/components/Theme/theme-toggle";
import SugarChart from "../charts/SugarChart";
const api_url = import.meta.env.VITE_API_URL;

function PatientHealthBoard() {
  const userId = sessionStorage.getItem("user_id");
  const [data, setData] = useState(null);
  const [apmnt, setApmnt] = useState([]);
  // fetch appoointments
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${api_url}/health/getHealthTablePatient/${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setData(res.data.data[0]);
    } catch (err) {
      console.error("Error loading health data", err);
    }
  };
  const appoointment = async () => {
    const userId = sessionStorage.getItem("user_id");
    try {
      const apm = await axios.get(
        `${api_url}/appointment/getAppointmentForPatientHealthBoard/${userId}`,
        {
          withCredentials: true,
        }
      );
      // console.log(apm);
      setApmnt(apm.data.data);
    } catch (err) {
      console.error("Error loading appointment", err);
    }
  };
  useEffect(() => {
    fetchData();
    appoointment();
  }, []);
  return (
    <>
      <div className={`flex-1 flex flex-col`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow-md  flex justify-between items-center border-b p-3">
          <div className="flex items-center space-x-2">
            {/* Hamburger for mobile */}

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 pl-4">
              My Health Board
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </header>
        {/* */}
        <div className="p-5 ">
          <div className="min-h-screen bg-background text-foreground p-6 transition-colors bg-zinc-100 dark:bg-slate-950">
            {/* Header */}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Patient Summary */}
              <Card className="lg:col-span-4">
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 p-2">
                    <h2 className="text-2xl font-semibold">
                      {data?.patientName}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      Approved By : {data?.doctorName} -{" "}
                      {data?.doctorDepartment}{" "}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Date: {data?.createdAt}
                    </p>

                    {/* <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">Diabetes</Badge>
                      <Badge variant="secondary">Hypertension</Badge>
                    </div> */}
                  </div>
                  {/* <div className="text-sm space-y-1">
                    <p>
                      ⚖️ Weight: <strong>78 kg</strong>
                    </p>
                    <p>
                      📏 Height: <strong>172 cm</strong>
                    </p>
                    <p>
                      
                    </p>
                  </div> */}
                  <div className="flex items-center justify-end">
                    {/* <Button>Download Report</Button> */}
                  </div>
                </CardContent>
              </Card>

              {/* Vitals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ScanHeart className="w-5 h-5" /> Oxygen Saturation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {data?.Oxygen_saturation}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {data?.Oxygen_saturation >= 95
                      ? "Normal"
                      : data?.Oxygen_saturation >= 91
                      ? "Low-normal"
                      : data?.Oxygen_saturation >= 85
                      ? "Low"
                      : "Critical"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartPulse className="w-5 h-5" /> Heart Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{data?.Heart_rate} bpm</p>
                  <p className="text-xs text-muted-foreground"> {data?.Heart_rate < 60
                      ? "Low"
                      : data?.Heart_rate <= 100
                      ? "Normal"
                      
                      : "High"
                      }</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5" /> Temperature
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {data?.Body_temperature}°C
                  </p>
                  <p className="text-xs text-muted-foreground">{data?.Body_temperature < 35
                      ? "Low (Hypothermia)⬇️"
                      : data?.Body_temperature <= 37.5
                      ? "Stable / Normal ✅"
                      
                      : "High ⬆️"
                      }</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" /> Blood Pressure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{data?.Blood_pressure}</p>
                  {/* <p className="text-xs text-muted-foreground">Controlled</p> */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="w-5 h-5" /> Glucose
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {data?.Blood_sugar} mg/dL
                  </p>
                  <p className="text-xs text-muted-foreground">{data?.Blood_sugar < 70
                      ? "Low⬇️"
                      : data?.Blood_sugar <= 140
                      ? "Stable / Normal ✅"
                      
                      : "High ⬆️"
                      }</p>
                </CardContent>
              </Card>

              {/* Sugar Pie */}
              <Card>
                <CardHeader>
                  <CardTitle>Sugar Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-64 w-full p-1 ">
                  <SugarChart />
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HandHeart className="w-5 h-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm font-semibold space-y-2">
                    <li>Gender : <strong>{data?.gender}</strong></li>
                    <li>Age : <strong>{data?.age} yrs </strong></li>
                    <li>Blood Group : <strong>{data?.blood_group}</strong> </li>
                    <li>Weight : <strong>{data?.weight} Kg</strong></li>
                    <li>Hieght : <strong>{data?.height} cm</strong></li>
                    <li>📊 BMI: <strong>{data?.weight / (data?.height/100*data?.height/100)}</strong></li>
                  </ul>
                </CardContent>
              </Card>

              {/* Medications */}
              {/* <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5" /> Medications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>Metformin — 500mg (AM)</li>
                    <li>Amlodipine — 5mg (PM)</li>
                  </ul>
                </CardContent>
              </Card> */}

              {/* Appointments */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" /> Appointments
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Last Five Completed
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    {apmnt.map((a) => (
                      <li key={a._id}>
                        {" "}
                        # {a.title} - {a.appointmentDate}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Lifestyle */}
              {/* <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Lifestyle Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    🚶 Steps: <strong>7,500</strong>
                  </div>
                  <div>
                    😴 Sleep: <strong>6.8 hrs</strong>
                  </div>
                  <div>
                    🥗 Diet: <strong>80%</strong>
                  </div>
                  <div>
                    💧 Hydration: <strong>2.2 L</strong>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientHealthBoard;
