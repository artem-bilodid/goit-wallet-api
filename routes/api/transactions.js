const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');

const { addTransaction, getTransactions } = require('../../controllers/transactions');

router.get('/', auth, getTransactions);
router.post('/', auth, addTransaction);

module.exports = router;
