import { prepareExpenseLineChartData } from '../../utils/helper';
import React, { useEffect, useState } from 'react'
import { LuPlus } from "react-icons/lu"
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({ transaction, onExpenseIncome }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transaction);
        setChartData(result);

        return () => { };
    }, [transaction])

    return (
        <div className='card w-full col-span-full'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h5 className='text-lg'>Expense Overview</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>
                        Track your spending trends over time and gain insights into where your monney goes.
                    </p>
                </div>

                <button
                    className='add-btn'
                    onClick={onExpenseIncome}
                >
                    <LuPlus className='text-lg' />
                    Add Expense
                </button>
            </div>

            <div className='mt-10'>
                <CustomLineChart data={chartData} />
            </div>

        </div>
    )
}

export default ExpenseOverview