import React from 'react'
import ThemeToggle from '@/components/Theme/theme-toggle'
import Sample from './sample'

function AdminManageDoctors() {
  return (
    <>
       <div className={`flex-1 flex flex-col`}>
               {/* Header */}
               <header className="bg-white dark:bg-gray-900 shadow-md  flex justify-between items-center border-b p-3">
                 <div className="flex items-center space-x-2">
                   {/* Hamburger for mobile */}
       
                   <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 pl-4">
                     Doctors
                   </h1>
                 </div>
       
                 <div className="flex items-center space-x-4">
                   <ThemeToggle />
                 </div>
               </header>
               <div>


               </div>
               <div className='p-5'>

              <Sample />
                             </div>


               </div>
    </>
  )
}

export default AdminManageDoctors