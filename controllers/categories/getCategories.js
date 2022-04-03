const { Category } = require('../../models');

const defaultCategories = require('../../db/defaultCategories.json');

const getCategories = async (req, res) => {
  const { _id } = req.user;

  const categories = await Category.find({ owner: _id });

  return res.status(200).json([...defaultCategories, ...categories]);
};

module.exports = getCategories;

//
