import React from 'react'
import REVENUE from "../../assets/images/revenue.png"
import { LuTrendingUpDown } from "react-icons/lu"

const AuthLayouts = ({ children }) => {
    return (
        <div className='flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100'>
            <div className='w-full md:w-[60vw] px-4 sm:px-12 pt-8 pb-12 overflow-auto'>
                {children}
            </div>

            <div className='hidden md:block md:w-[40vw] bg-[#c7bbfe] bg-auth-bg-img bg-cover bg-no-repeat bg-center   p-4 sm:p-8 relative overflow-hidden'>
                <div className='w-32 sm:w-48 h-32 sm:h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5' />
                <div className='w-32 sm:w-48 h-40 sm:h-56 rounded-[40px] border-[16px] sm:border-[20px] border-fuchsia-600 absolute top-[30%] -right-16 sm:-right-24' />
                <div className='w-32 sm:w-48 h-32 sm:h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5' />

                <div className='relative z-20 w-full max-w-[300px] sm:max-w-[450px] md:max-w-full top-8 sm:top-13 right-2 sm:right-3'>
                    <StatsInfoCard
                        icon={<LuTrendingUpDown />}
                        label="Track Your Income & Expenses"
                        value="475.00"
                        color="bg-primary"
                    />
                </div>

                <img
                    src={REVENUE}
                    className='w-[90%] max-w-[300px] sm:max-w-[450px] md:max-w-full mx-auto absolute bottom-0 sm:bottom-15 shadow-lg shadow-blue-400/15 object-contain'
                    alt="Revenue graph"
                />
            </div>
        </div>
    )
}

export default AuthLayouts

const StatsInfoCard = ({ icon, label, value, color }) => {
    return (
        <div className='flex gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10 w-full'>
            <div
                className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center
                     text-[28px] sm:text-[32px] text-white ${color} rounded-full drop-shadow-xl shrink-0`}
            >
                {icon}
            </div>
            <div className='flex-1 min-w-0'>
                <h6 className='text-sm sm:text-base text-gray-500 mb-1 truncate'>{label}</h6>
                <span className='text-xl sm:text-2xl whitespace-nowrap'>${value}</span>
            </div>
        </div>
    )
}