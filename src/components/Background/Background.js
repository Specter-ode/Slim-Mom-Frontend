import s from './Background.module.css';
import { useSelector } from 'react-redux';
import { isLogin } from 'redux/auth/auth-selector';

const Background = ({ children }) => {
  // const isLoginIn = useSelector(isLogin);

  const isLoginIn = true;
  return (
    <>
      {isLoginIn ? (
        <div className={s.background_with_login}>{children}</div>
      ) : (
        <div className={s.background}>{children}</div>
      )}
    </>
  );
};

export default Background;
