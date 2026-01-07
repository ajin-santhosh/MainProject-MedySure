import React from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import 'temporal-polyfill/global'
import '@schedule-x/theme-default/dist/index.css'
import '@schedule-x/theme-shadcn/dist/index.css'
import { createCalendar } from '@schedule-x/calendar'
//
import { useState,useEffect } from 'react'
// import axios from 'axios'
// component import 
import ThemeToggle from '@/components/Theme/theme-toggle'
import CustomTimeGridEvent from '@/components/cards/CustomTimeGridEvent'
function DoctorCalendar() {
    const eventsService = useState(() => createEventsServicePlugin())[0]
         const calendar = useCalendarApp({
               theme: "shadcn",
             views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
             defaultView: "week",
             eventContent(event) {
             return <CustomTimeGridEvent calendarEvent={event} />;
           },
             plugins: [eventsService]
           })
          
           useEffect(() => {
             // get all events
             eventsService.getAll()
           }, [])
  return (
<>
  <div className={`flex-1 flex flex-col`}>
          {/* Header */}
          <header className="bg-white dark:bg-gray-900 shadow-md  flex justify-between items-center border-b p-3">
            <div className="flex items-center space-x-2">
              {/* Hamburger for mobile */}
  
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 pl-4">
                Calandar
              </h1>
            </div>
  
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </header>
  
       <div className='p-5'>
        <ScheduleXCalendar calendarApp={calendar}/>
        
      </div>
  
          </div>
</>   )
}

export default DoctorCalendar