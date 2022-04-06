const { Transaction } = require('../../models');
const ObjectId = require('mongoose').Types.ObjectId;

const getStatistics = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { year, month } = req.statisticsParams;

    const result = await Transaction.aggregate([
      {
        $match: {
          owner: ObjectId(_id),
        },
      },
      {
        $addFields: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
      },
      {
        $match: {
          year: year,
          month: month,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryObj',
        },
      },
      {
        $unwind: '$categoryObj',
      },
      {
        $group: {
          _id: { isExpense: '$isExpense', category: '$categoryObj.name' },
          categorySum: { $sum: '$amount' },
        },
      },
      {
        $group: {
          _id: { isExpense: '$_id.isExpense' },
          categories: {
            $push: { category: '$_id.category', categorySum: { $round: ['$categorySum', 2] } },
          },
          totalSum: { $sum: '$categorySum' },
        },
      },
      {
        $project: {
          _id: 0,
          isExpense: '$_id.isExpense',
          categories: '$categories',
          totalSum: { $round: ['$totalSum', 2] },
        },
      },
    ]);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getStatistics;
