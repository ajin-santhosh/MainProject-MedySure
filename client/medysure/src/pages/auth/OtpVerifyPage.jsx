import React from "react";
import { toast } from "sonner";
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
  const email = sessionStorage.getItem("user_email");
  const api_url = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [warning, setWarning] = useState("");

  const [timeLeft, setTimeLeft] = useState(300);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    // function for checking timer
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
  if (timeLeft == 0) {
    // check timer

    sessionStorage.removeItem("user_email");
    navigate("/register");
  }
  const verifyOtp = async () => {
    console.log(otp);
    try {
      setWarning("");
      const verify = await axios.post(
        `${api_url}/patient/patientOtpValidate`,
        { otp: otp, email },

        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log("otp verified successfully", verify.data.message);
      toast.success("Your Otp Verified");
      navigate("/patient-form");
    } catch (error) {
      if (error.response) {
        // Backend returned error (like 401)
        setWarning(error.response.data.message || "verification failed ");
        toast.warning("verification failed");
      } else if (error.request) {
        setWarning("Server not responding. Try again later.");
        toast.warning("Server not responding. Try again later.");
      } else {
        setWarning("Something went wrong: " + error.message);
        toast.warning("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen p-10 ">
        <div className="absolute top-4 right-4 p-3">
          <ThemeToggle />
        </div>
        <div className="min-h-screen flex flex-col justify-center items-center gap-4 font-pfont_2 ">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={otp}
            onChange={(value) => setOtp(value)}
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
          {warning && <p className="text-red-800 font-sm">{warning}</p>}
          <Button className="w-20 " onClick={verifyOtp}>
            Submit{" "}
          </Button>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>© 2026 MedySure. All rights reserved.</span>
          <div className="flex gap-4">
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Twitter
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpVerifyPage;
