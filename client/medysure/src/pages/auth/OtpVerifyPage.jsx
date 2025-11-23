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

function OtpVerifyPage() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
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
    navigate("/register");
  }

  return (
    <div className="min-h-screen p-10 ">
      <div className="absolute top-4 right-4 p-3">
        <ThemeToggle />
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 font-pfont_2 ">
        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
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
        <Button className="w-20 ">Submit </Button>
      </div>
    </div>
  );
}

export default OtpVerifyPage;
