const Joi = require('joi');

const categoryValidation = {
  createCategoryValidation: (req, res, next) => {
    const schema = Joi.object({
      isExpense: Joi.boolean().required(),
      category: Joi.string().max(50).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
};

module.exports = categoryValidation;
