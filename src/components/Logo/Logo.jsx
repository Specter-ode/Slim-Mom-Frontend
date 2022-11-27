import s from './Logo.module.css';
import logoMob_NotLogin from 'assets/png/logoMob_NotLogin.png';
import logoMob from 'assets/png/logoMob.png';
import logoTab from 'assets/png/logoTab.png';
import logoDeskTop from 'assets/png/logoDeskTop.png';
import { useSelector } from 'react-redux';
import { getLoginStatus } from 'redux/auth/auth-selector';
import { Link } from 'react-router-dom';

const Logo = () => {
  const isLogin = useSelector(getLoginStatus);

  return (
    <div className={s.logo}>
      <Link to="/">
        {isLogin ? (
          <img src={logoMob} alt="logo" className={s.logoMob} width={160} height={44} />
        ) : (
          <img
            src={logoMob_NotLogin}
            alt="logo"
            className={s.logoMob_NotLogin}
            width={44}
            height={47}
          />
        )}
        <img src={logoTab} alt="logo" className={s.logoTab} width={162} height={44} />
        <img src={logoDeskTop} alt="logo" className={s.logoDeskTop} width={167} height={66} />
      </Link>
    </div>
  );
};

export default Logo;
