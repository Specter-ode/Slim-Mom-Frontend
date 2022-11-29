import PropTypes from 'prop-types';
import Spinner from 'react-spinners/CircleLoader';
import s from '../Loader/Loader.module.css';

export default function Loader({ height = '100%' }) {
  return (
    <div className={s.loader} style={{ height: height }}>
      <Spinner
        color="#ff9406"
        loading
        size={200}
        aria-label="Loading Spinner"
        speedMultiplier={0.7}
      />
    </div>
  );
}

Loader.propTypes = {
  height: PropTypes.string,
};
