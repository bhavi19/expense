const express = require('express');
const router = express.Router();
const { addExpense, getAllExpenses, removeAnExpense, getAllDayExpenses } = require('../Controller/expense');

router.post('/new', addExpense);
router.get('/expenses/:id', getAllExpenses)
router.get('/expenses/day/:id/:date', getAllDayExpenses)
router.delete('/expenses/:id', removeAnExpense)

module.exports = router;