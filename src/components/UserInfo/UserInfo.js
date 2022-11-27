import s from './UserInfo.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from 'redux/auth/auth-selector';
import { handleLogout } from 'redux/auth/auth-operations';
const UserInfo = () => {
  const { name = 'Nick' } = useSelector(getUser);
  const dispatch = useDispatch();
  return (
    <div className={s.userinfo}>
      <div className={s.block}>
        <p className={s.text}>{name}</p>
        <button className={s.btn} onClick={() => dispatch(handleLogout())}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
