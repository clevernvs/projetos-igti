import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import ModalTransaction from './components/ModalTransaction';
import PeriodSelector from './components/PeriodSelector';
import Registers from './components/registers/Registers';
import Result from './components/Result';
import TransactionService from './services/TransactionService';

export default function App() {
  const [registers, setRegisters] = useState([]);
  const [originalRegisters, setOriginalRegisters] = useState([]);
  const [totalRegisters, setTotalRegisters] = useState(0);
  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sucessMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRegister, setSelectedRegister] = useState({});
  const handleChangePeriodSelector = (period) => {
    TransactionService.getByPeriods(period).then((response) => {
      const {
        totalRegisters,
        incomes,
        expenses,
        totalValue,
        registers,
      } = response.data;
      setTotalRegisters(totalRegisters);
      setIncomes(incomes);
      setExpenses(expenses);
      setTotalValue(incomes - expenses);
      setRegisters(registers);
      setOriginalRegisters(registers);
    });
  };

  const handleClickedAndSelectedRegisterCreateOrUpdate = (registerEdit) => {
    setSelectedRegister(registerEdit);
    setIsModalOpen(true);
  };

  const handleClickedAndSelectedRegisterToRemove = (item) => {
    TransactionService.remove(item._id).then((response) => {
      if (response.data._id) {
        setSuccessMessage(
          `Registro removido com sucesso do periodo ${item.yearMonth} de valor R$ ${item.type}${item.value}!`
        );
        handleChangePeriodSelector(response.data.yearMonth);
      } else {
        setErrorMessage('Erro ao tentar salvar o registro!');
      }
    });
  };

  const handleOnClose = (event) => {
    setIsModalOpen(false);
    setSelectedRegister({});
  };

  const handleFilter = (filterText) => {
    const filteredRegisters = originalRegisters.filter((register) =>
      register.description.toUpperCase().includes(filterText.toUpperCase())
    );
    let incomes = 0;
    let expenses = 0;
    let totalValue = 0;
    for (const register of filteredRegisters) {
      if (register.type === '+') {
        incomes += register.value;
      } else {
        expenses += register.value;
      }
    }
    totalValue = incomes - expenses;
    setIncomes(incomes);
    setExpenses(expenses);
    setTotalValue(totalValue);
    setTotalRegisters(filteredRegisters.length);
    setRegisters(filteredRegisters);
  };

  const handlePersistData = (formData, idSelected) => {
    if (!idSelected) {
      TransactionService.create(formData).then((response) => {
        if (response.data._id) {
          setSuccessMessage(
            `Registro salvo com sucesso do periodo ${formData.yearMonth} de valor R$ ${formData.type}${formData.value}!`
          );
          handleChangePeriodSelector(response.data.yearMonth);
        } else {
          setErrorMessage('Erro ao tentar salvar o registro!');
        }
      });
    } else {
      TransactionService.update(formData, idSelected).then((response) => {
        if (response.data._id) {
          setSuccessMessage(
            `Registro alterado com sucesso do periodo ${formData.yearMonth} de valor R$ ${formData.type}${formData.value}!`
          );
          handleChangePeriodSelector(response.data.yearMonth);
        } else {
          setErrorMessage('Erro ao tentar salvar o registro!');
        }
      });
    }
    setIsModalOpen(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  }, [sucessMessage]);
  return (
    <div className="container">
      <div className="row">
        <h2>Desafio Final do Bootcamp Full Stack</h2>
      </div>
      <div className="row">
        <h3>Controle Financeiro</h3>
      </div>
      <div className="row">
        <PeriodSelector
          onChangePeriodSelecor={handleChangePeriodSelector}
        ></PeriodSelector>
      </div>
      <div className="row">
        <Result
          totalRegisters={totalRegisters}
          incomes={incomes}
          expenses={expenses}
          totalValue={totalValue}
        ></Result>
      </div>
      <div className="row">
        <div className="input-field col s2">
          <button
            className="waves-effect waves-light btn"
            onClick={(e) => setIsModalOpen(true)}
          >
            + NOVO LANÇAMENTO
          </button>
        </div>
        <div className="input-field col s10">
          <input
            type="text"
            id="filterText"
            onChange={(e) => handleFilter(e.target.value)}
          />
          <label htmlFor="filterText"></label>
        </div>
      </div>
      <div className="row">
        <span>{sucessMessage || errorMessage}</span>
      </div>
      <div>
        <Registers
          registers={registers}
          onClickedEditRegisterApp={
            handleClickedAndSelectedRegisterCreateOrUpdate
          }
          onClickedRemoveRegisterApp={handleClickedAndSelectedRegisterToRemove}
        ></Registers>
        {isModalOpen && (
          <ModalTransaction
            onSave={handlePersistData}
            selected={selectedRegister}
            onClose={handleOnClose}
          ></ModalTransaction>
        )}
      </div>
    </div>
  );
}