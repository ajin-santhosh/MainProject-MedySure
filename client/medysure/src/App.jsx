import React from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./components/Theme/theme-toggle";
import { BrowserRouter as Router, Routes, Route,Navigate  } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import OtpVerifyPage from "./pages/auth/OtpVerifyPage";
import PatientRegistration from "./pages/auth/PatientRegistration";
// Admin pages
import AdminNavBar from "./pages/admin/AdminNavBar";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import AdminAppointment from "./pages/admin/AdminAppointment";
import AdminManageDoctors from "./pages/admin/AdminManageDoctors";
import AdminManagePatients from "./pages/admin/AdminManagePatients";
import AdminManageAdmins from "./pages/admin/AdminManageAdmins";
import AdminManageReports from "./pages/admin/AdminManageReports";
import AdminCalandar from "./pages/admin/AdminCalandar";
import AdminManageFeedback from "./pages/admin/AdminManageFeedback";

// Patient pages
import PatientNavBar from "./pages/patient/PatientNavBar";
import PSample from "./pages/patient/PSample";
import PatientDashBoard from "./pages/patient/PatientDashBoard";
import PatientBookAppointment from "./pages/patient/PatientBookAppointment";
function App() {
  return (
    <>
      {/*     
    <h1 className="text-3xl font-bold">Shadcn UI Test</h1>
         <ThemeToggle/>
      <Button>Default Button</Button>

      <Button variant="destructive">
        Delete
      </Button>

      <Button variant="outline">
        Outline
      </Button> */}

      <Router>
        <Routes>
         {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp-verify" element={<OtpVerifyPage />} />
        <Route path="/patient-form" element={<PatientRegistration />} />

        {/* Admin parent route */}
        <Route path="/admin" element={<AdminNavBar />}>
          {/* Default redirect: /admin → /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Admin child routes */}
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="doctors" element={<AdminManageDoctors />} />
          <Route path="patients" element={<AdminManagePatients />} />
          <Route path="admins" element={<AdminManageAdmins />} />
          <Route path="appointment" element={<AdminAppointment />} />
          <Route path="report" element={<AdminManageReports />} />
          <Route path="calandar" element={<AdminCalandar />} />
          <Route path="feedback" element={<AdminManageFeedback />} />
        </Route>



        {/* patient Routes */}
        <Route path="/patient" element={<PatientNavBar />} >
           {/* Default redirect: /admin → /admin/dashboard */}
           <Route index element={<Navigate to="dashboard" replace />} />
           <Route path="dashboard" element={<PatientDashBoard />} />
           <Route path="book-appointment" element={<PatientBookAppointment />} />

        </Route>
      </Routes>
      </Router>
    </>
  );
}

export default App;
