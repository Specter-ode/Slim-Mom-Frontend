import PropTypes from 'prop-types';

import s from '../Button/Button.module.css';

// Кнопка принимает 4 пропса.

// 1. text = Обязательный пропс текст кнопки.
// 2. isPrimaryButton = Необязательный пропс, по умолчанию стоит true, если вы хотите кнопку у
//  которой фон белый и бордер оранжевый передаете isPrimaryButton={false}.
// 3. width = Обязательный пропс минимальный размер,
//  так как одна кнопка Add, кнопки логинизации/регистрации,
//  кнопки калькулятора разной ширины.
// 4. onClick =  пропс действие при клике.

const Button = ({ text, isPrimaryButton = true, width, onClick, isDisabled = false }) => {
  const buttonClass = isPrimaryButton ? s.primaryButton : s.secondaryButton;

  return (
    <button
      onClick={onClick}
      style={{ minWidth: width }}
      disabled={isDisabled}
      type="submit"
      className={buttonClass}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  isPrimaryButton: PropTypes.bool,
  isDisabled: PropTypes.bool,
  width: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default Button;
