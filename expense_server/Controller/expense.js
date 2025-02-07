const expenseModal = require('../Model/expenses');
const moment = require('moment')
const addExpense = async (req, res) => {
    const { expenseAmount, expenseDescription, user_id, date } = req.body
    try {
        const result = await expenseModal.create({
            expenseAmount: expenseAmount,
            expenseDescription, expenseDescription,
            user_id: user_id,
            date: date
        })

        res.status(201).json({ user: result })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })

    }
}

const getAllExpenses = async (req, res) => {
    console.log("here")
    const { id } = req.params
    try {
        const expenseData = await expenseModal.find({ user_id: id }).sort({ date: -1 });
        res.status(200).send({
            expenseData,
            message: `Data fetched successfully`,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}



const getAllDayExpenses = async (req, res) => {
    const { id, date } = req.params
    try {
        const expenseData = await expenseModal.find({ user_id: id }).sort({ date: -1 });
        console.log(expenseData)

        function checkSame(date1, date2) {
            return moment(date1).isSame(date2);
        }
        let filteredData = expenseData.filter((expense) => {
            return checkSame(moment(expense.date).format("YYYY-MM-DD"), date)
        })

        console.log("filteredData", filteredData)
        res.status(200).send({
            filteredData,
            message: `Data fetched successfully`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

const removeAnExpense = async (req, res) => {
    const { id } = req.params
    try {
        await expenseModal.deleteOne({ _id: id });
        res.status(200).send({
            message: `Data removed successfully`
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = { addExpense, getAllExpenses, removeAnExpense, getAllDayExpenses }
