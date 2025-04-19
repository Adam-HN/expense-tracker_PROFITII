import React from 'react'
import {
    LuPiggyBank,
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2
} from 'react-icons/lu';
import { LiaPiggyBankSolid } from "react-icons/lia";

const TransactionInfoCard = ({
    title,
    icon,
    date,
    amount,
    type,
    hideDeleteBtn,
}) => {
    return (
        <div className='group flex items-center gap-4 mt-2 p-3 rounded-lg'>
            <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
                {icon ? (
                    <img src={icon} alt={title} className='w-6 h-6' />
                ) : (
                    <LiaPiggyBankSolid />
                )}
            </div>
        </div>
    )
}

export default TransactionInfoCard