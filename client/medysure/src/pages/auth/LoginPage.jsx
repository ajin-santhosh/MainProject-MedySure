import React, { useState } from "react";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/Theme/theme-toggle";
import PageLoader from "@/components/Loader/PageLoader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// function start

function LoginPage() {
  const api_url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubtmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    setWarning("");
    try {
      setLoading(true);
      const login = await axios.post(`${api_url}/userLogin`, formData, {
        withCredentials: true,
      });
      // console.log(
      //   "Login successful:",
      //   login.data.message,
      //   login.data.data.id,
      //   login.data.data.role
      // );
      toast.success(`Welcome ${login.data.data.email} `);
      sessionStorage.setItem("user_id", login.data.data.id);

      if (login.data.data.role == "admin") {
        navigate("/admin");
      } else if (login.data.data.role == "doctor") {
        navigate("/doctor");
      } else if (login.data.data.role == "patient") {
        navigate("/patient");
      } else {
        console.log("error in role");
      }
    } catch (error) {
      if (error.response) {
        // Backend returned error (like 401)
        setWarning(error.response.data.message || "Login failed");
        toast.warning("Oops..! Login failed");
      } else if (error.request) {
        setWarning("Server not responding. Try again later.");
        toast.warning("Server not responding. Try again later");
      } else {
        setWarning("Something went wrong: " + error.message);
        toast.warning("Something went wrong:");
      }
    } finally {
      setLoading(false);
    }
  };
  if (loading)
    return (
      <PageLoader text="Sometime server may down due to inactivity...this may take upto < 50 seconds" />
    );
  return (
    <>
      <div className="min-h-screen p-10 ">
        {/* <div class="relative size-10 ...">
      <div class="absolute top-0  size-16 ...">03</div>
     </div> */}
        <div className="absolute top-4 right-4 p-3">
          <ThemeToggle />
        </div>
        <div className="flex">
          {/* LEFT SIDE */}
          <div className="m-10 hidden md:flex w-1/2 bg-gray-100 dark:bg-gray-900 flex-col justify-center items-center p-10 rounded-3xl">
            <img
              src="https://res.cloudinary.com/dvlal7skv/image/upload/v1763488647/Green_and_White_Modern_Medical_Logo_1__page-0001_jujlbb.jpg"
              alt="Project Logo"
              className="w-3/4 h-3/4 mb-6 rounded-2xl"
            />

            <h2 className="text-3xl font-medysure font-normal tracking-wide mb-4 text-gray-800 dark:text-gray-100">
              MedySure
            </h2>

            <p className="text-gray-600 font-pfont_1 dark:text-gray-300 text-center max-w-sm">
              Your Daily Life Medical Partner
            </p>
          </div>

          <div className="flex w-full md:w-1/2 justify-center items-center p-10  font-pfont_2">
            <form onSubmit={handleSubtmit}>
              <FieldSet className="border-2 border-gary-200 border-l-gray-400 p-10">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">E-mail</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <FieldDescription>
                      Enter You registerd email id.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <FieldDescription>
                      Must be at least 6 characters long.
                    </FieldDescription>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Field>
                </FieldGroup>
                <Button type="submit">Login</Button>{" "}
                {warning && <p className="text-red-800 font-sm">{warning}</p>}
                <p className="text-center text-gray-600 mt-4">
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-500 hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </FieldSet>
            </form>
          </div>
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

export default LoginPage;
