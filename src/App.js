import React, { useState } from 'react';

import Installments from './components/Installments';
import Installment from './components/Installment';
import Form from './components/Form';

export default function App() {
  const [initialValue, setInitialValue] = useState(1000);
  const [monthlyInterest, setMonthlyInterest] = useState(0.5);
  const [monthlyPeriod, setMonthlyPeriod] = useState(1);

  // const state = useState(0);
  // const myNumber = state[0];
  // const setMyNumber = state[1];
  // const [myNumber, setMyNumber] = useState(0);

  // useEffect(() => {
  //   calculateInterest(initialValue, monthlyInterest, monthlyPeriod);
  // }, [initialValue, monthlyInterest, monthlyPeriod]);

  const handleFormChanges = (newValue, newInterest, newPeriod) => {
    if (newValue !== null) {
      setInitialValue(newValue);
      return;
    }

    if (newInterest !== null) {
      setMonthlyInterest(newInterest);
      return;
    }

    setMonthlyPeriod(newPeriod);
  };

  const calculateInterest = (initialValue, monthlyInterest, monthlyPeriod) => {
    const newInstallments = [];

    let currentId = 1;
    let currentValue = initialValue;
    let percentage = 0;
    const profit = monthlyInterest > 0;

    for (let i = 1; i <= monthlyPeriod; i++) {
      const valueWithInterest =
        (currentValue * Math.abs(monthlyInterest)) / 100;

      currentValue =
        monthlyInterest >= 0
          ? currentValue + valueWithInterest
          : currentValue - valueWithInterest;

      percentage = (currentValue / initialValue - 1) * 100;

      newInstallments.push({
        id: currentId++,
        value: currentValue,
        difference: currentValue - initialValue,
        percentage,
        profit,
      });
    }

    return newInstallments;
  };

  const installments = calculateInterest(
    initialValue,
    monthlyInterest,
    monthlyPeriod
  );

  return (
    <div className='container center'>
      <h1 className='center'>Calcular Juros Compostos</h1>

      <Form
        data={{ initialValue, monthlyInterest, monthlyPeriod }}
        onChangeData={handleFormChanges}
      />

      <Installments>
        {installments.map((installment) => {
          return <Installment key={installment.id}>{installment}</Installment>;
        })}
      </Installments>
    </div>
  );
}
