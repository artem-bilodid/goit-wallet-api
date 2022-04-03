const { Schema, model } = require('mongoose');

const categorySchema = Schema(
  {
    category: {
      type: String,
      required: [true, 'Set the Category'],
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
