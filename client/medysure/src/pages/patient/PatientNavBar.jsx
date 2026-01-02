import React from 'react'
import { useState } from "react";
import {
  Menu,
  Home,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  CalendarSearch,
  CalendarPlus,
  SquareActivity,
  TicketsPlane,
  CalendarCheck,
  Landmark,
  MessageSquareMore,
} from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/Theme/theme-toggle";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";


/* ---------------------------------------------
   SHARED SIDEBAR MENU (ONLY WRITTEN ONCE)
---------------------------------------------- */
function SidebarMenu({ collapsed, openMenus, toggleMenu }) {
  return (
    <nav className="flex flex-col gap-4">
      {/* Dashboard */}
      <div>
        <Link to='dashboard'>
        <button
          onClick={() => toggleMenu("dashboard")}
          className="
            w-full flex items-center justify-between p-2 rounded-md 
            hover:bg-gray-100 dark:hover:bg-gray-800
          "
        >
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            {!collapsed && <span>Dashboard</span>}
            
          </div>
          {/* {!collapsed && (
              openMenus.dashboard ? <ChevronDown /> : <ChevronRight />
            )} */}
        </button>
        </Link>

        {/* {openMenus.dashboard && !collapsed && (
          <div className="ml-8 mt-2 flex flex-col gap-2">
            <button className="text-sm hover:underline">Overview</button>
            <button className="text-sm hover:underline">Analytics</button>
            <button className="text-sm hover:underline">Reports</button>
          </div>
        )} */}
      </div>
    {/* book appointment */}

      <div>
        <Link to="book-appointment" >
        <button
          onClick={() => toggleMenu("bookAppointment")}
          className="
            w-full flex items-center justify-between p-2 rounded-md 
            hover:bg-gray-100 dark:hover:bg-gray-800
          "
        >
          <div className="flex items-center gap-2">
            <CalendarPlus className="h-4 w-4" />
            {!collapsed && <span>Book Appointment</span>}
          </div>
        </button>
        </Link>
      </div>
      
      {/*My Appointments */}

      <div>
        <Link to="view-appointment">
        <button
          onClick={() => toggleMenu("myAppointments")}
          className="
            w-full flex items-center justify-between p-2 rounded-md 
            hover:bg-gray-100 dark:hover:bg-gray-800
          "
        >
          <div className="flex items-center gap-2">
            <CalendarSearch className="h-4 w-4" />
            {!collapsed && <span>My Appointments</span>}
          </div>
        </button>
        </Link>
      </div>
      {/* Resports */}

      <div>
        <Link to= "view-reports" >
        <button
          onClick={() => toggleMenu("myReports")}
          className="
            w-full flex items-center justify-between p-2 rounded-md 
            hover:bg-gray-100 dark:hover:bg-gray-800
          "
        >
          <div className="flex items-center gap-2">
            <TicketsPlane className="h-4 w-4" />
            {!collapsed && <span>My Reports</span>}
          </div>
        </button>
        </Link>
      </div>
            {/* my heath boradr */}

      <div>
        <Link to= "health-board" >
        <button
          onClick={() => toggleMenu("myHealth")}
          className="
            w-full flex items-center justify-between p-2 rounded-md 
            hover:bg-gray-100 dark:hover:bg-gray-800
          "
        >
          <div className="flex items-center gap-2">
            <SquareActivity className="h-4 w-4" />
            {!collapsed && <span>My Health Board</span>}
          </div>
        </button>
        </Link>
      </div>
      {/* Calender */}

      <div>
        <Link to="calandar">
        <button
          onClick={() => toggleMenu("calandar")}
          className="
            w-full flex items-center justify-between p-2 rounded-md 
            hover:bg-gray-100 dark:hover:bg-gray-800
          "
        >
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4" />
            {!collapsed && <span>Calender</span>}
          </div>
        </button>
        </Link>
      </div>
      {/* Feedback*/}
      <div>
        <Link to="feedback">
        <button
          onClick={() => toggleMenu("feedback")}
          className="
            w-full flex items-center justify-between p-2 rounded-md 
            hover:bg-gray-100 dark:hover:bg-gray-800
          "
        >
          <div className="flex items-center gap-2">
            <MessageSquareMore className="h-4 w-4" />
            {!collapsed && <span>Feedback</span>}
          </div>
        </button>
        </Link>
      </div>
      {/* Payements */}

      <div>
        <button
          onClick={() => toggleMenu("payment")}
          className="
            w-full flex items-center justify-between p-2 rounded-md 
            hover:bg-gray-100 dark:hover:bg-gray-800
          "
        >
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4" />
            {!collapsed && <span>Payments</span>}
          </div>
        </button>
      </div>

      {/* Settings */}
      <Button
        variant="ghost"
        className="justify-start hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Settings className="h-4 w-4" />
        {!collapsed && <span className="ml-2">Settings</span>}
      </Button>
    </nav>
  );
}
  //  MAIN COMPONENT (USES ONE SIDEBAR MENU)

export default function PatientNavBar({children}) {
   const [collapsed, setCollapsed] = useState(false);
    const [openMenus, setOpenMenus] = useState({
      dashboard: false,
      profile: false,
      appointment:false,
      payment:false,
      feedback:false,
      calandar:false,
      myHealth:false,
      myReports:false,
      myAppointments:false,
      bookAppointment:false
    });
  
    const toggleMenu = (key) =>
      setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        {/* -------- DESKTOP -------- */}
        <aside
          className={`
            hidden md:flex flex-col border-r transition-all overflow-hidden
            bg-white dark:bg-gray-950
            border-gray-200 dark:border-gray-800
            ${collapsed ? "w-20" : "w-64"}
          `}
        >
          {/* Header */}
          <div
            className="
              p-4 border-b flex justify-between items-center
              border-gray-200 dark:border-gray-800
            "
          >
            {!collapsed && (
              <div className="flex items-center">
                <img
                  src="https://res.cloudinary.com/dvlal7skv/image/upload/v1764175364/Green_and_White_Modern_Medical_Logo__1__page-0001-removebg-preview_pnxcha.png"
                  alt="logo"
                  className="w-14 h-14"
                />
                <h2 className="font-bold font-medysure text-lg ">Medy Sure</h2>{" "}
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Menu />
            </Button>
          </div>
  
          {/* Shared Menu */}
          <div className="flex-1 p-4 overflow-auto">
            <SidebarMenu
              collapsed={collapsed}
              openMenus={openMenus}
              toggleMenu={toggleMenu}
            />
          </div>
  
          {/* Footer */}
          <div
            className="
              p-4 border-t 
              border-gray-200 dark:border-gray-800
            "
          >
            <Button
              variant="destructive"
              className="w-full justify-start dark:bg-red-600 dark:hover:bg-red-700"
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </aside>
  
        {/* -------- MOBILE -------- */}
        <div
          className="
            md:hidden p-4 border-b flex items-center gap-2
            border-gray-200 dark:border-gray-800
            bg-white dark:bg-gray-950
          "
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
  
            <SheetContent
              side="left"
              className="p-4 bg-white dark:bg-gray-950 text-black dark:text-white"
            >
              <div className="flex items-center">
                {/* <img
                  src="https://res.cloudinary.com/dvlal7skv/image/upload/v1764175364/Green_and_White_Modern_Medical_Logo__1__page-0001-removebg-preview_pnxcha.png"
                  alt="logo"
                  className="w-14 h-14"
                /> */}
                <h2 className="font-bold font-medysure text-lg ">Medy Sure</h2>{" "}
              </div>
  
              <SidebarMenu
                collapsed={false}
                openMenus={openMenus}
                toggleMenu={toggleMenu}
              />
  
              <div className="mt-6 border-t pt-4 border-gray-200 dark:border-gray-800">
                <Button
                  variant="destructive"
                  className="w-full justify-start dark:bg-red-600 dark:hover:bg-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="ml-2">Logout</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center">
            {/* <img
              src="https://res.cloudinary.com/dvlal7skv/image/upload/v1764175364/Green_and_White_Modern_Medical_Logo__1__page-0001-removebg-preview_pnxcha.png"
              alt="logo"
              className="w-14 h-14"
            /> */}
            {/* <h2 className="font-bold font-medysure text-lg ">Medy Sure</h2>{" "} */}
          </div>
        </div>
  
        {/* Content */}
        <main className="flex-1 overflow-auto relative">
          {children}
  
         <Outlet />
        </main>
      </div>
    );
  }


