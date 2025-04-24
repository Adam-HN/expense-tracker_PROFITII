import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({ transaction, openDelete, onDonwload }) => {
    return (
        <div className='card w-full col-span-full'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>All Expanses</h5>

                <button className='card-btn' onClick={onDonwload}>
                    <LuDownload className='text-base' /> Downlaod
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2'>
                {transaction?.map((expense) => (
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format('Do MMM YYYY')}
                        amount={expense.amount}
                        type="expense"
                        onDelete={() => openDelete(expense._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseList