const { Schema, model } = require('mongoose');

const categorySchema = Schema(
  {
    isExpense: {
      type: Boolean,
      required: [true, 'Set if transaction is Expense or not'],
    },
    name: {
      type: String,
      required: [true, 'Set the Category Name'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false },
);

const Category = model('category', categorySchema);

module.exports = Category;
