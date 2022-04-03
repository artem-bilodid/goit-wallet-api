const { User } = require('../../models');

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: null });

    return res.status(204).json({
      message: 'Logout success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
