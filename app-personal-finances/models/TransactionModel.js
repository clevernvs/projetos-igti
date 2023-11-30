import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let schema = mongoose.Schema({
  description: {
    type: String,
    required: [true, process.env.REQUIRED_FIELD],
  },
  value: {
    type: Number,
    required: [true, process.env.REQUIRED_FIELD],
  },
  category: {
    type: String,
    required: [true, process.env.REQUIRED_FIELD],
  },
  year: {
    type: Number,
    required: [true, process.env.REQUIRED_FIELD],
  },
  month: {
    type: Number,
    required: [true, process.env.REQUIRED_FIELD],
  },
  day: {
    type: Number,
    required: [true, process.env.REQUIRED_FIELD],
  },
  yearMonth: {
    type: String,
    required: [true, process.env.REQUIRED_FIELD],
  },
  yearMonthDay: {
    type: String,
    required: [true, process.env.REQUIRED_FIELD],
  },
  type: {
    type: String,
    required: [true, process.env.REQUIRED_FIELD],
  },
});

const TransactionModel = mongoose.model('transaction', schema);

export default TransactionModel;