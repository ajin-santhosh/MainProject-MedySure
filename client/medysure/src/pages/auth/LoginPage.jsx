import React from "react";
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
import { ImageOff, Import } from "lucide-react";
function LoginPage() {
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
            <FieldSet className="border-2 border-gary-200 border-l-gray-400 p-10">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">E-mail</FieldLabel>
                  <Input id="email" type="email" placeholder="name@email.com" />
                  <FieldDescription>
                    Enter You registerd email id.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <FieldDescription>
                    Must be at least 6 characters long.
                  </FieldDescription>
                  <Input id="password" type="password" placeholder="••••••••" />
                </Field>
              </FieldGroup>
              <Button>Login</Button>{" "}
              <p className="text-center text-gray-600 mt-4">
                Don’t have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register
                </Link>
              </p>
            </FieldSet>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
