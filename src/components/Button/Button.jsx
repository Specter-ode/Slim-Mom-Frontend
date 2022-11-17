import s from '../Button/Button.module.css';
import PropTypes from 'prop-types';

// Кнопка принимает 4 пропса.

// 1. text = Обязательный пропс текст кнопки.
// 2. isPrimaryButton = Необязательный пропс, по умолчанию стоит true, если вы хотите кнопку у
//  которой фон белый и бордер оранжевый передаете isPrimaryButton={false}.
// 3. width = Обязательный пропс минимальный размер,
//  так как одна кнопка Add, кнопки логинизации/регистрации,
//  кнопки калькулятора разной ширины.
// 4. onClick = Обязательный пропс действие при клике.

export default function Button({ text, isPrimaryButton = true, width, onClick }) {
  const buttonClass = isPrimaryButton ? s.primaryButton : s.secondaryButton;

  return (
    <button onClick={onClick} style={{ minWidth: width }} type="submit" className={buttonClass}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  isPrimaryButton: PropTypes.bool,
  width: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
