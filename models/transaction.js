const { Schema, model } = require('mongoose');

const transactionSchema = Schema(
  {
    isExpense: {
      type: Boolean,
      required: [true, 'Set if transaction is Expense or not'],
    },
    category: {
      type: String,
      required: [true, 'Set the Category'],
    },
    amount: {
      type: Number,
      required: [true, 'Set the Amount'],
    },
    comment: {
      type: String,
      default: '',
    },
    balance: {
      type: Number,
      required: [true, 'Set the Balance'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const Transaction = model('transaction', transactionSchema);

module.exports = Transaction;
