import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../../components/Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverView = ({ transactions, onAddIncomes }) => {
    const [chartData, setCharacterData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setCharacterData(result);

        return () => { };
    }, [transactions]);

    return (
        <div className="card w-full col-span-full">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earnings overtime and analyze your income trends.
                    </p>
                </div>

                <button className="add-btn" onClick={onAddIncomes}>
                    <LuPlus className="text-lg" />
                    Add Income
                </button>
            </div>

            <div className="mt-10">
                <CustomBarChart data={chartData} />
            </div>
        </div>
    );
};

export default IncomeOverView;