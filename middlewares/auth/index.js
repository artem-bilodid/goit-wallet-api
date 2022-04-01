const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;

    const [bearer, token] = authorization.split(' ');
    const tokenValidationResult = token && jwt.verify(token, JWT_KEY);

    if (bearer !== 'Bearer' || !tokenValidationResult) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    const { _id } = jwt.decode(token);

    const currentUser = await User.findById(_id);

    if (!currentUser || currentUser.token !== token) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }
    const { email, name } = currentUser;
    req.user = { _id, email, name };

    next();
  } catch (error) {
    switch (error.message) {
      case 'invalid token':
        return res.status(401).json({
          message: 'Not authorized',
        });
      default:
        next(error);
    }
  }
};

module.exports = { auth };
