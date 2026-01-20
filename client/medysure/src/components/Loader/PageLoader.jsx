import React from 'react'

function PageLoader({ text = "Loading..." }) {
  return (
<>
<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600"></div>

        {/* Branding */}
       <h2 className="text-3xl font-medysure font-normal tracking-wide mb-4 text-gray-800 dark:text-gray-100">
              MedySure
            </h2>

            <p className="text-gray-600 font-pfont_1 dark:text-gray-300 text-center max-w-sm">
              Your Daily Life Medical Partner
            </p>

        <p className="text-sm text-gray-500">{text}</p>
      </div>
    </div>
</>  )
}

export default PageLoader