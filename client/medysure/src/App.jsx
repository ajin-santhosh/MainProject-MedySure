import React from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./components/Theme/theme-toggle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import OtpVerifyPage from "./pages/auth/OtpVerifyPage";
import PatientRegistration from "./pages/auth/PatientRegistration";
import AdminPage from "./pages/admin/AdminPage";
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
          {/* <Route path="/" element={<PatientRegistration/>} /> */}

          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp-verify" element={<OtpVerifyPage />} />
          <Route path="/patient-form" element={<PatientRegistration />} />
          {/* <Route path="/admin" element={<AdminPage />} /> */}


        </Routes>
      </Router>
    </>
  );
}

export default App;
