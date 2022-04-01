const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');

const { addTransaction, getTransactions } = require('../../controllers/transactions');
const { createTransactionValidation } = require('../../middlewares/validation/transactions');

router.get('/', auth, getTransactions);
router.post('/', [auth, createTransactionValidation], addTransaction);

module.exports = router;
