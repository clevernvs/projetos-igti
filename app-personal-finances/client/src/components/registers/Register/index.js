import React from 'react';
import css from './register.module.css';
import { formatNumber } from '../../../helpers/formatData';

export default function Register(props) {
  const handleClickEdit = () => {
    props.OnClickEditRegister(props.item);
  };
  const handleClickRemove = () => {
    props.OnClickRemoveRegister(props.item);
  };
  const { day, category, description, value, type, _id } = props.item;
  return (
    <div className={`${type === '+' ? css.incomeBox : css.expenseBox}`}>
      <div className={`${css.dayBox}`}>
        <div> {day.toString().padStart(2, '0')}</div>
      </div>
      <div className={css.description}>
        <div className={css.category}>{category}</div>
        <div className={css.textDescription}>{description}</div>
      </div>
      <div className={css.value}>
        <div>R$ {formatNumber(value)}</div>
      </div>
      <div className={css.icon}>
        <i
          className="material-icons"
          style={{ cursor: 'pointer' }}
          onClick={handleClickEdit}
        >
          create
        </i>
        <i
          className="material-icons"
          style={{ cursor: 'pointer' }}
          onClick={handleClickRemove}
        >
          delete
        </i>
      </div>
    </div>
  );
}