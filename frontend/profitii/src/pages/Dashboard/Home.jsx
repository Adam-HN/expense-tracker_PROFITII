import React, { useEffect, useState } from 'react'
import DashboardLayout from "../../components/Layouts/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/ApiPaths";
import InfoCard from '../../components/Cards/InfoCard';

import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';

const Home = () => {
    useUserAuth();

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [incomeData, setIncomeData] = useState([]);

    const fetchDashboardData = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.DASHBOARD.GET_DATA}`
            );

            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    // Get All Income Details
    const fetchIncomeDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.INCOME.GET_INCOMES}`
            );

            if (response.data) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle Add Income
    const handleAddIncome = async (income) => {
        const { source, amount, date, icon } = income;

        // Validation Checks
        if (!source.trim()) {
            toast.error("Source is required.");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0.");
            return;
        }

        if (!date) {
            toast.error("Date is required.");
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                source,
                amount,
                date,
                icon,
            });

            setOpenAddIncomeModal(false);
            toast.success("Income added successfully.");
            fetchDashboardData();
        } catch (error) {
            console.error("Error adding income:", error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        return () => { };
    }, [dashboardData, incomeData]);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <InfoCard
                        icon={<IoMdCard />}
                        label="Total Balance"
                        path="/"
                        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                        color="bg-primary"
                        hoverColor="hover:bg-primary"
                    />
                    <InfoCard
                        icon={<LuWalletMinimal />}
                        label="Total Income"
                        path="/income"
                        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                        color="bg-orange-500"
                        hoverColor="hover:bg-orange-500"
                    />
                    <InfoCard
                        icon={<LuHandCoins />}
                        label="Total Expense"
                        path="/expense"
                        value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
                        color="bg-red-500"
                        hoverColor="hover:bg-red-500"
                    />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    <RecentTransactions
                        transactions={dashboardData?.recentTransactions}
                        onSeeMore={() => navigate("/expense")}
                    />

                    <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpenses={dashboardData?.totalExpenses || 0}
                    />

                    <ExpenseTransactions
                        transactions={dashboardData?.last30DaysExpenses?.transactions || []}
                        onSeeMore={() => navigate("/expense")}
                    />
                    <Last30DaysExpenses
                        data={dashboardData?.last30DaysExpenses?.transactions || []}

                    />

                    <RecentIncomeWithChart
                        data={dashboardData?.last60DaysIncomeTransactions?.transactions?.slice(0, 4) || []}
                        totalIncome={dashboardData?.totalIncome || 0}
                    />

                    <RecentIncome
                        transactions={dashboardData?.last60DaysIncomeTransactions?.transactions || []}
                        onSeeMore={() => navigate("/income")}
                    />
                </div>
            </div>

            <button className='fixed bottom-0 right-0 m-4 bg-[#9670f7] rounded-full text-white text-2xl w-[50px] h-[50px] flex items-center justify-center'
                onClick={() => setOpenAddIncomeModal(true)}
            >
                +
            </button>

            {openAddIncomeModal && (
                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm
                        onAddIncomes={handleAddIncome}
                    />
                </Modal>
            )}
        </DashboardLayout>
    )
}

export default Home