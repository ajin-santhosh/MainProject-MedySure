import React from "react";
import { useState } from "react";
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
  Moon,
  Sun,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ThemeToggle from "@/components/Theme/theme-toggle";
import SugarChart from "../charts/SugarChart";
function PatientHealthBoard() {
  const res = [
    { name1: "Normal", value: 65 },
    { name2: "Pre-Diabetic", value: 25 },
    { name3: "High", value: 10 },
  ];
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
                    <h2 className="text-xl font-semibold">John Doe</h2>
                    <p className="text-sm text-muted-foreground">
                      Male • 45 yrs • Blood Type O+
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
                      📊 BMI: <strong>26.4</strong> (Overweight)
                    </p>
                  </div> */}
                  <div className="flex items-center justify-end">
                    <Button>Download Report</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Vitals */}
              <Card>
                <CardHeader>
                  <CardTitle>🫁 Oxygen Saturation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">97%</p>
                  <p className="text-xs text-muted-foreground">Normal</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartPulse className="w-5 h-5" /> Heart Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">72 bpm</p>
                  <p className="text-xs text-muted-foreground">Normal</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5" /> Temperature
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">36.8 °C</p>
                  <p className="text-xs text-muted-foreground">Stable</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" /> Blood Pressure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">120/80</p>
                  <p className="text-xs text-muted-foreground">Controlled</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="w-5 h-5" /> Glucose
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">98 mg/dL</p>
                  <p className="text-xs text-muted-foreground">Fasting</p>
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
                    <AlertTriangle className="w-5 h-5" /> Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>⚠ Lab test overdue</li>
                    <li>⚠ BP follow-up needed</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Medications */}
              <Card className="lg:col-span-2">
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
              </Card>

              {/* Appointments */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" /> Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>Jan 15 — Cardiology</li>
                    <li>Jan 20 — Lab Tests</li>
                    <li>Feb 2 — Nutritionist</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Lifestyle */}
              <Card className="lg:col-span-4">
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
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientHealthBoard;
