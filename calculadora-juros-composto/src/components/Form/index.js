import React from 'react';

export default function Form({ data, onChangeData }) {
  const { initialValue, monthlyInterest, monthlyPeriod } = data;

  const handleChangeInitialValue = ({ target }) => {
    const value = parseFloat(target.value, 10);
    onChangeData(value, null, null);
  };

  const handleChangeMonthlyInterest = ({ target }) => {
    const value = parseFloat(target.value, 10);
    onChangeData(null, value, null);
  };

  const handleChangeMonthlyPeriod = ({ target }) => {
    const value = parseFloat(target.value, 10);
    onChangeData(null, null, value);
  };

  const rowClassName = 'col input-field s6 m4 l4';

  return (
    <div className='center row'>
      <div className={rowClassName}>
        <input
          id='inputInitialValue'
          type='number'
          min='100'
          step='100'
          value={initialValue}
          onChange={handleChangeInitialValue}
        />
        <label htmlFor='inputInitialValue' className='active'>
          Capital inicial:
        </label>
      </div>

      <div className={rowClassName}>
        <input
          id='inputMonthlyInterest'
          type='number'
          step='0.1'
          value={monthlyInterest}
          onChange={handleChangeMonthlyInterest}
        />
        <label htmlFor='inputMonthlyInterest' className='active'>
          Taxa de juros mensal:
        </label>
      </div>

      <div className={rowClassName}>
        <input
          id='inputMonthlyPeriod'
          type='number'
          min='1'
          step='1'
          value={monthlyPeriod}
          onChange={handleChangeMonthlyPeriod}
        />
        <label htmlFor='inputMonthlyPeriod' className='active'>
          Período (meses):
        </label>
      </div>
    </div>
  );
}
