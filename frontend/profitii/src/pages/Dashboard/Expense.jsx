import DashboardLayout from '../../components/Layouts/DashboardLayout'
import React from 'react'
import { useUserAuth } from "../../hooks/useUserAuth";

const Expense = () => {
    useUserAuth();

    return (
        <DashboardLayout activeMenu="Expenses">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default Expense