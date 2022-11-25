import s from './AdditionalHeaderField.module.css';
import { ReactComponent as BackArrow } from 'assets/icons/back-arrow.svg';
import { UserInfo } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStatus } from 'redux/auth/auth-selector';
import { useLocation } from 'react-router-dom';
// import { getUser, getToken } from 'redux/auth/auth-selector';
// import { logout } from 'redux/auth/auth-operations';
const AdditionalHeaderField = () => {
  const showModal = useSelector(getModalStatus);
  const { pathname } = useLocation();
  // const { name } = useSelector(getUser);
  // const token = useSelector(getToken);

  const token = true;

  return (
    <div className={s.block}>
      {(showModal || pathname === '/diary' || pathname === '/diary-mobile-form') && (
        <BackArrow className={s.icon} />
      )}
      {token && <UserInfo />}
    </div>
  );
};

export default AdditionalHeaderField;
