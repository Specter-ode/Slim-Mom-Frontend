// import PropTypes from 'prop-types';

import svg from '../../assets/icons/sprite.svg';
import s from '../ButtonPlus/ButtonPlus.module.css';

const ButtonPlus = ({ onClick }) => {
  return (
    <button onClick={onClick} type="submit" className={s.button}>
      <svg className={s.icon} width="23" height="23">
        <use href={`${svg}#plus`}></use>
      </svg>
    </button>
  );
};

// ButtonPlus.propTypes = {
//   onClick: PropTypes.func.isRequired,
// };

export default ButtonPlus;
