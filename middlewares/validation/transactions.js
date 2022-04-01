const Joi = require('joi');

const transactionsValidation = {
  createTransactionValidation: (req, res, next) => {
    const schema = Joi.object({
      isExpense: Joi.boolean().required(),
      category: Joi.string().required(),
      amount: Joi.number().positive().precision(2).required(),
      comment: Joi.string().max(200),
    });

    const validationResult = schema.validate(req.body, { convert: false });
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
};

module.exports = transactionsValidation;
