import axiosInstance from '../../utils/axiosInstance';
import IncomeOverView from '../../components/Income/IncomeOverView';
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import React, { useEffect, useState } from 'react'
import { API_PATHS } from '../../utils/ApiPaths';
import { useUserAuth } from "../../hooks/useUserAuth";
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';

const Income = () => {

    useUserAuth();

    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [onDeleteAlert, setOnDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

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
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error adding income:", error.response?.data?.message || error.message);
        }
    };

    // Delete Income
    const handleDeleteIncome = async (id) => { };

    // Handle Download Income Details
    const handleDownloadIncomeDetails = async () => { };

    useEffect(() => {
        fetchIncomeDetails();
    }, []);

    return (
        <DashboardLayout activeMenu="Income">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <IncomeOverView
                        transactions={incomeData}
                        onAddIncomes={() => setOpenAddIncomeModal(true)}
                    />
                </div>
            </div>

            <Modal
                isOpen={openAddIncomeModal}
                onClose={() => setOpenAddIncomeModal(false)}
                title="Add Income"
            >
                <AddIncomeForm
                    onAddIncomes={handleAddIncome}
                />
            </Modal>
        </DashboardLayout>
    )
}

export default Income