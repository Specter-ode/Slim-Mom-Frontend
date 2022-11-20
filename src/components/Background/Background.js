import s from './Background.module.css';
// import { useSelector } from 'react-redux';
// import { isLogin } from 'redux/auth/auth-selector';
import { useLocation } from 'react-router-dom';

const Background = ({ children }) => {
  // const isLoginIn = useSelector(isLogin);
  const { pathname } = useLocation();
  const isLogin = false;
  const style = (function () {
    if (pathname === '/register' || pathname === '/login') {
      if (window.innerWidth >= 1280) {
        return s.backgroundHome;
      }
      return s.backgroundAuth;
    } else if (isLogin) {
      return s.backgroundDiaryCalc;
    } else {
      return s.backgroundHome;
    }
  })();

  return (
    <>
      <div className={style}>{children}</div>
    </>
  );
};

export default Background;
