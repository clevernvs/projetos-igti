import React from 'react';
import css from './result.module.css';
import { formatNumber } from '../../helpers/formatData';
export default function Result({
  totalRegisters,
  totalValue,
  incomes,
  expenses,
}) {
  return (
    <div className={css.box}>
      <div>
        <span className={css.resultText}>Lançamento: </span>
        <span style={{ fontSize: '0.9rem' }}>{totalRegisters}</span>
      </div>
      <div>
        <span className={css.resultText}>Receitas: </span>
        <span className={css.incomes}>R$ {formatNumber(incomes)}</span>
      </div>
      <div>
        <span className={css.resultText}>Despesas: </span>
        <span className={css.expenses}>R$ {formatNumber(expenses)}</span>
      </div>
      <div>
        <span className={css.resultText}>Saldo: </span>
        <span className={totalValue < 0 ? css.expenses : css.incomes}>
          R$ {formatNumber(totalValue)}
        </span>
      </div>
    </div>
  );
}