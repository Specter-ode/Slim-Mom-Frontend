import s from './Background.module.css';
import { useSelector } from 'react-redux';
import { getLoginStatus } from 'redux/auth/auth-selector';
import { useLocation } from 'react-router-dom';

const Background = ({ children }) => {
  const isLogin = useSelector(getLoginStatus);
  const { pathname } = useLocation();
  const style = (function () {
    if (pathname === '/registration' || pathname === '/login' || pathname === '/forgot-password') {
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
