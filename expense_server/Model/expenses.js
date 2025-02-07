const mongoose = require('mongoose')
const moment = require('moment')


const expenseSchema = new mongoose.Schema({
    expenseAmount: {
        type: Number,
        required: [true, "expense amount required"],
        unique: false
    },
    expenseDescription: {
        type: String,
        required: [true, "Add the expense description"],
        unique: false
    },
    user_id: mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        required: [true, "Date is required"]
    }
})

module.exports = mongoose.model('expenses', expenseSchema)