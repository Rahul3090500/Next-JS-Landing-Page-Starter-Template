import React from 'react'

export default function Card() {
  return (
    <>
     <div className="bg-white rounded-lg shadow-lg p-6 border divide-y divide-gray-300">
      <div className="flex flex-col mb-4">
        <img src="https://verasity.ai/assets/images/verasity-logo-dark.svg" alt="Company Logo" className="w-10 h-10 mb-2" />
        <div className="text-lg font-semibold">Verasity</div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Content Here */}
      </div>
    </div>
  </>
  )
}
