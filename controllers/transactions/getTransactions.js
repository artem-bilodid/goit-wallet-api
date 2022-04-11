const { Transaction } = require('../../models');

const getTransactions = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, size = 5 } = req.query;

    const skip = (Number(page) - 1) * size;

    const transactions = await Transaction.find({ owner: _id })
      ?.sort({ createdAt: -1 })
      ?.skip(skip)
      ?.limit(Number(size))
      ?.populate('category', 'name');

    return res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = getTransactions;
