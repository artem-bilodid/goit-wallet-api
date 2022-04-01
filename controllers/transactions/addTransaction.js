const { Transaction } = require('../../models');
const currency = require('currency.js');

const addTransaction = async (req, res, next) => {
  try {
    const DEFAULT_BALANCE = 0;
    const ONE_TRANSACTION = 1;
    const { isExpense, category, amount, comment = '' } = req.body;
    const { _id } = req.user;

    const [{ balance: currentBalance = DEFAULT_BALANCE } = {}] = await Transaction.find({
      owner: _id,
    })
      ?.sort({ createdAt: -1 })
      ?.limit(ONE_TRANSACTION);

    const newBalance = isExpense
      ? currency(currentBalance).subtract(amount)
      : currency(currentBalance).add(amount);

    if (newBalance < 0) {
      return res.status(409).json({ message: 'Insufficient funds' });
    }

    const newTransaction = await Transaction.create({
      isExpense,
      category,
      amount,
      comment,
      balance: newBalance,
      owner: _id,
    });

    return res.status(201).json(newTransaction);
  } catch (error) {
    next(error);
  }
};

module.exports = addTransaction;
