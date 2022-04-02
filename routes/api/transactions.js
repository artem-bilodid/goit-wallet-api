const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');

const {
  addTransaction,
  getTransactions,
  getStatistics,
} = require('../../controllers/transactions');
const { createTransactionValidation } = require('../../middlewares/validation/transactions');
const { yearMonthValidation } = require('../../middlewares/validation/statistics');

router.get('/', auth, getTransactions);
router.get('/statistics', [auth, yearMonthValidation], getStatistics);
router.post('/', [auth, createTransactionValidation], addTransaction);

module.exports = router;
