import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
import TransactionModel from '../models/TransactionModel.js';

export const index = async (req, res, next) => {
  const { period } = req.query;
  try {
    if (!period) {
      throw new Error(
        'É necessário informar o parâmetro period cujo valor deve estar no formato yyyy-mm'
      );
    }

    const items = await TransactionModel.find({ yearMonth: period });
    const totalRegisters = items.length;
    let expenses = 0;
    let incomes = 0;
    for (const item of items) {
      if (item.type === '+') {
        incomes += item.value;
      } else {
        expenses += item.value;
      }
    }
    const totalValue = incomes - expenses;

    res.status(200).send({
      registers: items,
      totalRegisters: totalRegisters,
      incomes: incomes,
      expenses: expenses,
      totalValue: totalValue,
    });
  } catch (err) {
    next(err);
  }
};
export const create = async (req, res, next) => {
  try {
    const item = await TransactionModel.create(req.body);
    res.status(201).send(item);
  } catch (err) {
    next(err);
  }
};

export const periodsList = async (req, res, next) => {
  try {
    const items = await TransactionModel.find(
      {},
      { year: 1, month: 1, _id: 0 }
    ).sort({ year: 1, month: 1 });
    const periods = new Set();
    for (const item of items) {
      const month = converMonth(item.month);
      const result = `${month}/${item.year}`;
      periods.add(result);
    }
    res.status(200).send({ periods: [...periods] });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await TransactionModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).send(item);
  } catch (err) {
    next(err);
  }
};
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await TransactionModel.findByIdAndDelete(id);
    res.status(201).send(item);
  } catch (err) {
    next(err);
  }
};

const converMonth = (month) => {
  if (month < 1 || month > 12) {
    throw new Error('O mês precisa estar entre Janeiro e Dezembro (inclusive)');
  }
  let monthName = null;
  switch (month) {
    case 1:
      monthName = 'Jan';
      break;
    case 2:
      monthName = 'Fev';
      break;
    case 3:
      monthName = 'Mar';
      break;
    case 4:
      monthName = 'Abr';
      break;
    case 5:
      monthName = 'Mai';
      break;
    case 6:
      monthName = 'Jun';
      break;
    case 7:
      monthName = 'Jul';
      break;
    case 8:
      monthName = 'Ago';
      break;
    case 9:
      monthName = 'Set';
      break;
    case 10:
      monthName = 'Out';
      break;
    case 11:
      monthName = 'Nov';
      break;
    case 12:
      monthName = 'Dez';
      break;
    default:
      throw new Error('Erro ao buscar o mês.');
  }
  return monthName;
};