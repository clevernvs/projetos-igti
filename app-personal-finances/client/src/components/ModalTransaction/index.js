import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import css from './modaltransaction.module.css';
import M from 'materialize-css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '40%',
    transform: 'translate(-50%, -50%)',

    backgroundColor: 'white',
  },
  overlay: { zIndex: 1000 },
};

Modal.setAppElement('#root');
export default function ModalTransaction({ onSave, selected, onClose }) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [idSelected, setIdSelected] = useState('');
  M.AutoInit();

  useEffect(() => {
    if (selected._id) {
      setDescription(selected.description);
      setCategory(selected.category);
      setValue(selected.value);
      setType(selected.type);
      setDate(selected.yearMonthDay);
      setIdSelected(selected._id);
      setTimeout(() => {
        M.updateTextFields();
      }, 100);
    }
  }, []);

  const handleClose = (event) => {
    onClose(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const dateSplitted = date.split('-');
    const [year, month, day] = [...dateSplitted];

    const formData = {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth: `${year}-${month}`,
      yearMonthDay: `${year}-${month}-${day}`,
      type,
    };
    if (idSelected) {
      onSave(formData, idSelected);
    } else {
      onSave(formData);
    }
  };

  return (
    <div>
      <Modal isOpen={true} style={customStyles}>
        <div className={css.header}>
          <div style={{ display: 'inline' }}>
            <h5>{selected._id ? 'Edição' : 'Criação'} de Lançamento</h5>
          </div>
          <div>
            <button className={css.close} onClick={handleClose}>
              X
            </button>
          </div>
        </div>
        <div className={css.form}>
          <form onSubmit={handleFormSubmit}>
            <div className={css.flexRowType}>
              <label>
                <input
                  name="receita"
                  type="radio"
                  value="+"
                  checked={type === '+'}
                  onChange={(e) => setType(e.target.value)}
                />
                <span>Receita</span>
              </label>
              <label>
                <input
                  name="receita"
                  type="radio"
                  value="-"
                  checked={type === '-'}
                  onChange={(e) => setType(e.target.value)}
                />
                <span>Despesa</span>
              </label>
            </div>

            <div className={css.flexRow}>
              <div className="input-field" style={{ width: '100%' }}>
                <input
                  id="description"
                  type="text"
                  className="validate"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="description">Descrição</label>
              </div>
            </div>
            <div className={css.flexRow}>
              <div className="input-field" style={{ width: '100%' }}>
                <input
                  id="category"
                  type="text"
                  className="validate"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label htmlFor="category">Categoria</label>
              </div>
            </div>
            <div className={css.flexLastRow}>
              <div className="input-field" style={{ width: '65%' }}>
                <input
                  id="value"
                  type="text"
                  className="validate"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <label htmlFor="value">Valor</label>
              </div>
              <div className="input-field" style={{ width: '30%' }}>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <button className="waves-effect waves-light btn">SALVAR</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}