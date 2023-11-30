import React, { useEffect, useState } from 'react';
import PeriodService from '../../services/PeriodService';
import M from 'materialize-css';
export default function PeriodSelector({ onChangePeriodSelecor }) {
  const [periodList, setPeriodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('default');

  useEffect(() => {
    M.AutoInit();
    retrievePeriodList();
  }, [loading]);

  const retrievePeriodList = () => {
    async function getPeriodList() {
      const response = await PeriodService.getAll();
      setPeriodList(response.data.periods);
      setLoading(false);
    }
    getPeriodList();
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
    const month = convertMonth(event.target.value.split('/')[0])
      .toString()
      .padStart(2, '0');
    const year = event.target.value.split('/')[1];
    const data = year + '-' + month;
    onChangePeriodSelecor(data);
  };

  const convertMonth = (month) => {
    switch (month) {
      case 'Jan':
        return 1;

      case 'Fev':
        return 2;

      case 'Mar':
        return 3;

      case 'Abr':
        return 4;

      case 'Mai':
        return 5;

      case 'Jun':
        return 6;

      case 'Jul':
        return 7;

      case 'Ago':
        return 8;

      case 'Set':
        return 9;

      case 'Out':
        return 10;

      case 'Nov':
        return 11;

      case 'Dez':
        return 12;

      default:
        return 0;
    }
  };

  return (
    <div>
      <div className="input-field col s4">
        <select value={selected} disabled={loading} onChange={handleChange}>
          <option value="default">Escolha um período</option>
          {periodList.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}