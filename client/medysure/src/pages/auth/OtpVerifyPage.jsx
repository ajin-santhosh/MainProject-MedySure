import React from "react";
("use client");
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FieldDescription } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/Theme/theme-toggle";
import axios from "axios";

// function start here
function OtpVerifyPage() {
  const userId = sessionStorage.getItem("user_id");
  const api_url = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [warning, setWarning] = useState("");

  const [timeLeft, setTimeLeft] = useState(300);
  const [otp, setOtp] = useState("");

  useEffect(() => {                                // function for checking timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  if (timeLeft == 0) {                              // check timer

    const deleteUser = axios.post(`${api_url}/admin/deleteAdmin/${userId}`, {
      withCredentials: true,
    });
    console.log("user deleted", deleteUser.data.message);

    sessionStorage.removeItem("user_id");
    navigate("/register");
  }
  const verifyOtp = async () => {
    console.log(otp)
    try {
      setWarning('')
      const verify = await axios.post(
        `${api_url}/patient/patientOtpValidate/${userId}`,
        {otp:otp},
        
    {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  }
      );
      console.log("otp verified successfully", verify.data.message);
      navigate("/patient-form");
    } catch (error) {
      if (error.response) {
        // Backend returned error (like 401)
        setWarning(error.response.data.message || "verification failed ");
      } else if (error.request) {
        setWarning("Server not responding. Try again later.");
      } else {
        setWarning("Something went wrong: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen p-10 ">
      <div className="absolute top-4 right-4 p-3">
        <ThemeToggle />
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 font-pfont_2 ">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          value={otp}
          onChange={(value) => setOtp(value) }
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription>
          Enter the 6 digit Otp sended to your mail id,{" "}
          <span className="font-semibold text-red-800">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
         
        </FieldDescription>
         {warning && (
        <p className="text-red-800 font-sm">{warning}</p>
      )}
        <Button className="w-20 " onClick={verifyOtp}>
          Submit{" "}
        </Button>
      </div>
    </div>
  );
}

export default OtpVerifyPage;
