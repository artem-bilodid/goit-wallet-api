const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { password } = req.body;
    const email = req.body.email.toLowerCase();

    const existingUser = await User.findOne({ email });

    if (!existingUser || !existingUser.checkPassword(password)) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      });
    }

    const { _id, name } = existingUser;

    const token = jwt.sign({ _id, email }, JWT_KEY);

    await User.findByIdAndUpdate(_id, { token });

    return res.status(200).json({ token, user: { email, name } });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
