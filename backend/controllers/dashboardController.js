const Income = require("../models/Income");
const Expense = require('../models/Expense');
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const userObjectID = new Types.ObjectId(userId);

        // Fetch total income & expenses
        const totalIncome = await Income.aggregate([
            { $match: { UserId: userObjectID } }, // Fixed: Capital U for Income
            { $group: { _id: null, totalIncome: { $sum: "$amount" } } }
        ]);

        console.log("totalIncome", { totalIncome, userId: isValidObjectId(userId) });

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectID } }, // Fixed: Lowercase u for Expense
            { $group: { _id: null, totalExpense: { $sum: "$amount" } } }
        ]);

        // Get income transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            UserId: userId, // Fixed: Capital U for Income
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId, // Correct for Expense
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Fetch last 5 transactions (income + expense)
        const last5Transactions = [
            ...(await Income.find({ UserId: userId }).sort({ date: -1 }).limit(5)).map( // Fixed: Capital U
                (txn) => ({ ...txn.toObject(), type: "Income" })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({ ...txn.toObject(), type: "Expense" })
            ),
        ].sort((a, b) => b.date - a.date);

        // Final response
        res.json({
            totalBalance:
                (totalIncome[0]?.totalIncome || 0) - (totalExpense[0]?.totalExpense || 0), // Fixed keys
            totalIncome: totalIncome[0]?.totalIncome || 0,
            totalExpenses: totalExpense[0]?.totalExpense || 0, // Fixed key
            last30DaysExpenses: {
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncomeTransactions: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: last5Transactions,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};