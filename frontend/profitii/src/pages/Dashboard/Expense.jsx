import DashboardLayout from '../../components/Layouts/DashboardLayout'
import React, { useEffect, useState } from 'react'
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from '../../utils/ApiPaths';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

const Expense = () => {
    useUserAuth();

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    // Get All Expense Details
    const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.EXPENSE.GET_EXPENSES}`
            );

            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle Add Expense
    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;

        // Validation Checks
        if (!category.trim()) {
            toast.error("Category is required.");
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
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon,
            });

            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully.");
            fetchExpenseDetails();
        } catch (error) {
            console.error("Error adding Expense:", error.response?.data?.message || error.message);
        }
    };
    // Delete Expense
    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense deleted successfully.");
            fetchExpenseDetails();
        } catch (error) {
            console.error("Error deleting expense: ", error.response?.data?.message || error.message);
        }
    };

    // Handle Download Expense Details
    const handleDownloadExpenseDetails = async () => { };

    useEffect(() => {
        fetchExpenseDetails();
        return () => { };
    }, [])


    return (
        <DashboardLayout activeMenu="Expenses">
            <div className='my-5 mx-auto'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ExpenseOverview
                        transaction={expenseData}
                        onExpenseIncome={() => setOpenAddExpenseModal(true)}
                    />

                    <ExpenseList
                        transaction={expenseData}
                        openDelete={(id) => {
                            setOpenDeleteAlert({
                                show: true,
                                data: id,
                            });
                        }}
                        onDonwload={() => { handleDownloadExpenseDetails }}
                    />

                    <Modal
                        isOpen={openAddExpenseModal}
                        onClose={() => setOpenAddExpenseModal(false)}
                        title="Add Expense"
                    >
                        <AddExpenseForm onAddExpense={handleAddExpense} />
                    </Modal>

                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title="Delete Expense"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this expense?"
                            onDelete={() => deleteExpense(openDeleteAlert.data)}
                        />
                    </Modal>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default Expense