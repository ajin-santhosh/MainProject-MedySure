import ThemeToggle from "@/components/Theme/theme-toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldDescription } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
function RegisterPage() {
  const navigate = useNavigate()
  const api_url = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [warning, setWarning] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e)=> {
  setWarning('')
    console.log(formData);
    if(formData.password !== formData.confirm_password){
      return(
        setWarning('Password not Matched')
    )
    }
    try{  
      const register = await axios.post(`${api_url}/patient/createPatient`,formData,{
        withCredentials:true
      })
      console.log(
        "register successful:",
        register.data.message,
        register.data.data.id
      )
      sessionStorage.setItem("user_id", register.data.data.id)
      navigate('/otp-verify')
    }
    catch(error){

      if (error.response) {
        // Backend returned error (like 401)
        setWarning(error.response.data.message || "register failed");
      } else if (error.request) {
        setWarning("Server not responding. Try again later.");
      } else {
        setWarning("Something went wrong: " + error.message);
      }
    }

  }

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
          <div className=" m-10 hidden md:flex w-1/2 bg-gray-100 dark:bg-gray-900 flex-col justify-center items-center p-10 rounded-3xl">
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

          <div className="flex flex-col w-full md:w-1/2 justify-center p-10 gap-2 font-pfont_2">
          <form action="" onSubmit={handleSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FieldDescription>
              Enter your valid email id for otp verification
            </FieldDescription>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="*******"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <FieldDescription>Enter a Password</FieldDescription>
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              type="password"
              id="confirm_password"
              placeholder="*******"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
           {warning && (
        <p className="text-red-800 font-sm">{warning}</p>
      )}
            <Button className="w-20" >Verify</Button>
            <p className="text- text-gray-600 mt-4 ">
              Already have an account, sign in -
              <Link to="/" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
