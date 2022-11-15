import s from './UserInfo.module.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { getUser, getToken } from 'redux/auth/auth-selector';
// import { logout } from 'redux/auth/auth-operations';
const UserInfo = () => {
  // const { name } = useSelector(getUser);
  // const token = useSelector(getToken);
  // const dispatch = useDispatch();

  // const onLogout = token => {
  //   dispatch(logout(token));
  // };
  return (
    <div className={s.block}>
      <p className={s.usermenu}>
        <span className={s.text}>NickName</span>
      </p>
      <button className={s.btn} onClick={() => {}}>
        Exit
      </button>
    </div>
  );
};

export default UserInfo;
