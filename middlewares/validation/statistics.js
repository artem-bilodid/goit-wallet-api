const Joi = require('joi');

const statisticsValidation = {
  yearMonthValidation: (req, res, next) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const schema = Joi.object({
      year: Joi.number().positive().max(currentYear),
      month: Joi.number().positive().max(12),
    });

    let { year, month } = req.query;

    if ((!year && month) || (year && !month)) {
      return res.status(400).json({
        message: 'Neither or both Year and Month should be provided.',
      });
    }

    if (!year && !month) {
      year = currentYear;
      month = currentMonth;
    } else {
      year = Number(year);
      month = Number(month);
    }

    const validationResult = schema.validate({ year, month }, { convert: false });
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }

    req.statisticsParams = { year, month };

    next();
  },
};

module.exports = statisticsValidation;
