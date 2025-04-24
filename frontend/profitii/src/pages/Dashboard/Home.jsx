import React, { useEffect, useState, useRef } from 'react';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/ApiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins, LuWalletMinimal, LuPlus } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';
import { addThousandsSeparator } from '../../utils/helper';
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown
    const dropdownRef = useRef(null); // Ref to handle clicks outside dropdown

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
            console.log('Something went wrong. Please try again.', error);
        } finally {
            setLoading(false);
        }
    };

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
            console.log('Something went wrong. Please try again.', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddIncome = async (income) => {
        const { source, amount, date, icon } = income;
        if (!source.trim()) {
            toast.error('Source is required.');
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error('Amount should be a valid number greater than 0.');
            return;
        }
        if (!date) {
            toast.error('Date is required.');
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
            toast.success('Income added successfully.');
            fetchDashboardData();
        } catch (error) {
            console.error('Error adding income:', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || 'Failed to add income.');
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        fetchDashboardData();
        return () => { };
    }, [dashboardData, incomeData]);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <RecentTransactions
                        transactions={dashboardData?.recentTransactions}
                        onSeeMore={() => navigate('/expense')}
                    />
                    <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpenses={dashboardData?.totalExpenses || 0}
                    />
                    <ExpenseTransactions
                        transactions={dashboardData?.last30DaysExpenses?.transactions || []}
                        onSeeMore={() => navigate('/expense')}
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
                        onSeeMore={() => navigate('/income')}
                    />
                </div>
            </div>

            {/* Plus Button with Dropdown */}
            <div className="fixed bottom-0 right-0 m-4" ref={dropdownRef}>
                <button
                    className="bg-[#9670f7] rounded-full text-white text-2xl w-[50px] h-[50px] flex items-center justify-center hover:bg-[#7f5ce6] transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-label="Open actions menu"
                >
                    <LuPlus />
                </button>

                {isDropdownOpen && (
                    <>
                        <div className="absolute bottom-16 right-0 bg-white shadow-lg rounded-lg border border-gray-200 w-48">
                            <button
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    setOpenAddIncomeModal(true);
                                }}
                            >
                                Add Income
                            </button>
                            <button
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    {/* Add setOpenAddExpenseModal */ }
                                }}
                            >
                                Add Expense
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Income Modal */}
            {openAddIncomeModal && (
                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm onAddIncomes={handleAddIncome} />
                </Modal>
            )}
        </DashboardLayout>
    );
};

export default Home;