import React from 'react';
import Register from '../Register';

export default function Registers({
  registers,
  onClickedEditRegisterApp,
  onClickedRemoveRegisterApp,
}) {
  const handleClickEditRegister = (registerClicked) => {
    onClickedEditRegisterApp(registerClicked);
  };
  const handleClickRemoveRegister = (registerClicked) => {
    onClickedRemoveRegisterApp(registerClicked);
  };
  return (
    <div>
      {registers.map((item) => (
        <Register
          key={item._id}
          item={item}
          OnClickEditRegister={handleClickEditRegister}
          OnClickRemoveRegister={handleClickRemoveRegister}
        ></Register>
      ))}
    </div>
  );
}