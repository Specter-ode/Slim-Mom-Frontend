import PropTypes from 'prop-types';

import svg from '../../assets/icons/sprite.svg';
import s from '../ButtonPlus/ButtonPlus.module.css';

const ButtonPlus = ({ type = 'submit', onClick }) => {
  return (
    <button onClick={onClick} type={type} className={s.button}>
      <svg className={s.icon} width="23" height="23">
        <use href={`${svg}#plus`}></use>
      </svg>
    </button>
  );
};

ButtonPlus.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonPlus;
