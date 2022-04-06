const { Transaction } = require('../../models');
const ObjectId = require('mongoose').Types.ObjectId;

const getStatistics = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { year, month } = req.statisticsParams;

    const FIRST_DAY_OF_MONTH = 1;

    const startPointYear = year;
    const startPointMonthIndex = month - 1;
    const endPointYear = month < 12 ? year : year + 1;
    const endPointMonthIndex = month < 12 ? startPointMonthIndex + 1 : 0;

    const startPoint = new Date(startPointYear, startPointMonthIndex, FIRST_DAY_OF_MONTH);
    const endPoint = new Date(endPointYear, endPointMonthIndex, FIRST_DAY_OF_MONTH);

    const result = await Transaction.aggregate([
      {
        $match: {
          owner: ObjectId(_id),
          createdAt: {
            $gte: startPoint, // тут указываете с какого числа месяца
            $lt: endPoint, // по какое число месяца.
          },
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
