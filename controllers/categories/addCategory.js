const { Category } = require('../../models');

const addCategory = async (req, res) => {
  const { _id } = req.user;
  const result = await Category.create({ ...req.body, owner: _id });

  res.status(201).json(result);
};

module.exports = addCategory;
