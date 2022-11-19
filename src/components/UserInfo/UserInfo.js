import s from './UserInfo.module.css';
import { ReactComponent as BackArrow } from 'assets/icons/back-arrow.svg';
// import { useSelector, useDispatch } from 'react-redux';
// import { getUser, getToken } from 'redux/auth/auth-selector';
// import { logout } from 'redux/auth/auth-operations';
const UserInfo = () => {
  // const { name } = useSelector(getUser);
  // const token = useSelector(getToken);
  const token = true;
  // const dispatch = useDispatch();

  // const onLogout = token => {
  //   dispatch(logout(token));
  // };
  return (
    <div className={s.block}>
      <BackArrow className={s.icon} />
      <div className={s.userinfo}>
        {token && (
          <>
            <p className={s.text}>Nick</p>
            <button className={s.btn} onClick={() => {}}>
              Exit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
