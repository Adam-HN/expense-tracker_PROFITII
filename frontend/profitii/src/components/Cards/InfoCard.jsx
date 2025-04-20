import React, { useState } from 'react'

const InfoCard = ({ icon, label, value, color, hoverColor }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-200 border border-gray-200/50 
      ${hoverColor} transition-all duration-300 delay-7 ease-in-out`}>
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full transition-all duration-300 ease-in-out ${isHovered ? 'drop-shadow-none' : 'drop-shadow-xl'}`}>
        {icon}
      </div>
      <div>
        <h6 className='text-lg font-mona-sans text-gray-600 mb-[1px] cursor-default'>{label}</h6>
        <span className='text-[22px] cursor-default'>${value}</span>
      </div>
    </div>
  )
}

export default InfoCard