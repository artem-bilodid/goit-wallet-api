const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');

const { addCategory, getCategories } = require('../../controllers/categories');
const { createCategoryValidation } = require('../../middlewares/validation/category');

router.get('/', auth, getCategories);
router.post('/', [auth, createCategoryValidation], addCategory);

module.exports = router;
