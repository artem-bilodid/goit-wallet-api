const { Category } = require('../../models');

const defaultCategories = require('../../db/defaultCategories.json');

const getCategories = async (req, res) => {
  const { _id } = req.user;

  const categories = await Category.find({ owner: _id });

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: [...defaultCategories, ...categories],
    },
  });
};

module.exports = getCategories;

//
