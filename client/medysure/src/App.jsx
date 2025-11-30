import React from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./components/Theme/theme-toggle";
import { BrowserRouter as Router, Routes, Route,Navigate  } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import OtpVerifyPage from "./pages/auth/OtpVerifyPage";
import PatientRegistration from "./pages/auth/PatientRegistration";
// Admin Components
import AdminNavBar from "./pages/admin/AdminNavBar";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import AdminAppointment from "./pages/admin/AdminAppointment";
import AdminManageDoctors from "./pages/admin/AdminManageDoctors";
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
          <Route path="appointment" element={<AdminAppointment />} />

        </Route>

      </Routes>
      </Router>
    </>
  );
}

export default App;
