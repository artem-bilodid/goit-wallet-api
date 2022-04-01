const express = require('express');
const router = express.Router();

const { addUser, login, logout, getCurrentUser } = require('../../controllers/users');
const { auth } = require('../../middlewares/auth');

const {
  emailAndPasswordValidation,
  createUserValidaton,
} = require('../../middlewares/validation/users');

router.post('/', createUserValidaton, addUser);
router.post('/login', emailAndPasswordValidation, login);
router.get('/logout', auth, logout);
router.get('/current', auth, getCurrentUser);

module.exports = router;
