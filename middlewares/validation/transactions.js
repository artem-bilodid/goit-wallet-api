const ObjectId = require('mongoose').Types.ObjectId;
const Category = require('../../models/category');
const Joi = require('joi');

const transactionsValidation = {
  createTransactionValidation: async (req, res, next) => {
    const schema = Joi.object({
      isExpense: Joi.boolean().required(),
      category: Joi.string()
        .min(24)
        .max(24)
        .required()
        .pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i),
      amount: Joi.number().positive().precision(2).required(),
      comment: Joi.string().min(0).max(200),
    });

    const categoryId = req.body.category;
    const isExpense = req.body.isExpense;

    const validationResult = schema.validate(req.body, { convert: false });
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }

    const [existingCategory] = await Category.find({
      _id: ObjectId(categoryId),
      isExpense: isExpense,
    });
    console.log(existingCategory);

    if (!existingCategory) {
      return res.status(400).json({
        message: `For a given Expense type: ${isExpense} the Categogory with ID: ${categoryId} not exists. Please enter a valid Category Id`,
      });
    }

    next();
  },
};

module.exports = transactionsValidation;
