import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";

import ThemeToggle from "@/components/Theme/theme-toggle";
function PatientRegistration() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-7xl font-pfont_2">
        <div className="absolute top-2 right-2 p-2">
          <ThemeToggle />
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Patient Form </CardTitle>
            <CardDescription>
              Enter your information below to complete your registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex justify-center  p-10 gap-5 ">
                <div className="border-2 border-gary-200 border-l-gray-400 p-5 w-64 flex-auto">
                  <FieldGroup>
                    <CardTitle>Patient Details </CardTitle>

                    <Field>
                      <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="first name"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="last name"
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                      <Input
                        id="phone"
                        type="text"
                        required
                        placeholder="+91 ...."
                      />
                    </Field>
                    <div className="flex gap-3">
                      <FieldLabel htmlFor="gender">gender</FieldLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="gender" id="gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FieldLabel htmlFor="blood_group">Blood Group</FieldLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="blood group"
                            id="blood_group"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="A+">A positive (A+)</SelectItem>
                            <SelectItem value="A-">A negative (A-)</SelectItem>
                            <SelectItem value="B+">B positive (B+)</SelectItem>
                            <SelectItem value="B-">B negative (B-)</SelectItem>
                            <SelectItem value="AB+">
                              AB positive (AB+)
                            </SelectItem>
                            <SelectItem value="AB-">
                              AB negative (AB-)
                            </SelectItem>
                            <SelectItem value="O+">O positive (O+)</SelectItem>
                            <SelectItem value="O-">O negative (O-)</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 p-10 ">
                      <Field>
                        <FieldLabel htmlFor="age">Age</FieldLabel>
                        <Input
                          id="age"
                          type="text"
                          placeholder="age"
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="hieght">Hieght</FieldLabel>
                        <Input
                          id="hieght"
                          type="text"
                          placeholder="hieght"
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="weight">Weight</FieldLabel>
                        <Input
                          id="weight"
                          type="text"
                          placeholder="weight"
                          required
                        />
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel htmlFor="place">Place</FieldLabel>
                      <Input
                        id="place"
                        type="text"
                        placeholder="place"
                        required
                      />
                    </Field>
                  </FieldGroup>
                </div>
                <div className="border-2 border-gary-200 border-l-gray-400 p-5 w-64 flex-auto">
                  {/* Emergancy contact details  */}
                  <FieldGroup>
                    <CardTitle>Emergancy Cotact Details</CardTitle>
                    <Field>
                      <FieldLabel htmlFor="cont_name">Name</FieldLabel>
                      <Input
                        id="cont_name"
                        type="text"
                        placeholder="name"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="relation"> Relation</FieldLabel>
                      <Input
                        id="relation"
                        type="text"
                        placeholder="relation"
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="cont_phone">Phone Number</FieldLabel>
                      <Input
                        id="cont_phone"
                        type="text"
                        required
                        placeholder="+91 ...."
                      />
                    </Field>
                  </FieldGroup>
                </div>
              </div>
              <div className="flex flex-col gap-6 p-5">
                <div className="flex items-center gap-3">
                  <Checkbox id="terms-2" defaultChecked />
                  <div className="grid gap-2">
                    <Label htmlFor="terms-2">Accept terms and conditions</Label>
                    <p className="text-muted-foreground text-sm">
                      By clicking this checkbox, you agree to the terms and
                      conditions.
                    </p>
                  </div>
                </div>
              </div>
              <FieldGroup>
                <Field>
                  <div>
                    <Button type="submit" className="w-25">
                      Register
                    </Button>
                  </div>
                  {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription> */}
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PatientRegistration;
