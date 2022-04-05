const { Transaction } = require('../../models');

const getTransactions = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const TRANSACTIONS_LIMIT = 6;

    const transactions = await Transaction.find({ owner: _id })
      ?.sort({ createdAt: -1 })
      ?.limit(TRANSACTIONS_LIMIT)
      ?.populate('category', 'category')
      ?.sort({ createdAt: 1 });

    return res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = getTransactions;
