const Joi = require('joi');

const userBaseValidation = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
};

const usersValidation = {
  createUserValidaton: (req, res, next) => {
    const schema = Joi.object({
      ...userBaseValidation,
      name: Joi.string().min(1).max(12).required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
  emailAndPasswordValidation: (req, res, next) => {
    const schema = Joi.object({
      ...userBaseValidation,
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
};

module.exports = usersValidation;
