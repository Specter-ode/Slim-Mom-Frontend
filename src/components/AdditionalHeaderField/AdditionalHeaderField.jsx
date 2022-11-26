import s from './AdditionalHeaderField.module.css';
import { ReactComponent as BackArrow } from 'assets/icons/back-arrow.svg';
import { UserInfo } from 'components';
import { useSelector } from 'react-redux';
import { getModalStatus } from 'redux/auth/auth-selector';
import { Navigate, useLocation } from 'react-router-dom';
import { updateModalStatus } from 'redux/auth/auth-slice';
// import { getUser, getToken } from 'redux/auth/auth-selector';
// import { logout } from 'redux/auth/auth-operations';

const AdditionalHeaderField = () => {
  const showModal = useSelector(getModalStatus);
  const { pathname } = useLocation();
  // const { name } = useSelector(getUser);
  // const token = useSelector(getToken);
  const dispatch = useDispatch();
  const isLogin = true;
  return (
    <div className={s.block}>
      {showModal && (
        <button
          onClick={() => {
            dispatch(updateModalStatus(false));
          }}
        >
          <BackArrow className={s.icon} />
        </button>
      )}
      {pathname === '/diary' && (
        <Navigate to="/calculator">
          <BackArrow className={s.icon} />
        </Navigate>
      )}
      {pathname === '/diary-mobile-form' && (
        <Navigate to="/diary">
          <BackArrow className={s.icon} />
        </Navigate>
      )}
      {isLogin && <UserInfo />}
    </div>
  );
};

export default AdditionalHeaderField;
