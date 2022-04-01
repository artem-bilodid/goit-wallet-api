const { User } = require('../../models');

const addUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const newUser = new User({ email, name });
    newUser.setPassword(password);
    await newUser.save();

    return res.status(201).json({ user: { email, name } });
  } catch (error) {
    next(error);
  }
};

module.exports = addUser;
