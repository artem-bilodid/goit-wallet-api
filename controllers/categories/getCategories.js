const { Category } = require('../../models');

const getCategories = async (req, res) => {
  const { _id } = req.user;

  const categories = await Category.find({ $or: [{ owner: { $exists: false } }, { owner: _id }] });

  return res.status(200).json(categories);
};

module.exports = getCategories;

