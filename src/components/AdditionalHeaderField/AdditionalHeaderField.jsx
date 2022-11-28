import s from './AdditionalHeaderField.module.css';
import { ReactComponent as BackArrow } from 'assets/icons/back-arrow.svg';
import { UserInfo } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStatus } from 'redux/auth/auth-selector';
import { Link, useLocation } from 'react-router-dom';
import { updateModalStatus } from 'redux/auth/auth-slice';
import { getLoginStatus } from 'redux/auth/auth-selector';

const AdditionalHeaderField = () => {
  const showModal = useSelector(getModalStatus);
  const { pathname } = useLocation();
  const isLogin = useSelector(getLoginStatus);
  const dispatch = useDispatch();
  return (
    <div className={s.block}>
      {showModal && (
        <button
          className={s.btn}
          onClick={() => {
            dispatch(updateModalStatus(false));
          }}
        >
          <BackArrow className={s.icon} />
        </button>
      )}
      {pathname === '/diary' && (
        <Link to="/calculator">
          <BackArrow className={s.icon} />
        </Link>
      )}
      {pathname === '/diary-mobile-form' && (
        <Link to="/diary">
          <BackArrow className={s.icon} />
        </Link>
      )}
      {isLogin && (
        <div className={s.thumb}>
          <UserInfo />
        </div>
      )}
    </div>
  );
};

export default AdditionalHeaderField;
