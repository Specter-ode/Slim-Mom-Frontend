import s from './Header.module.css';
import { AdditionalHeaderField, UserNav, UserInfo, Logo } from 'components';
import { ReactComponent as Burger } from 'assets/icons/burger.svg';
import { ReactComponent as Close } from 'assets/icons/close.svg';
import useWindowDimensions from 'services/hooks/useWindowDimensions';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getLoginStatus, getModalStatus } from 'redux/auth/auth-selector';

const Header = ({ menuActive, setMenuActive }) => {
  const { width } = useWindowDimensions();
  const isLogin = useSelector(getLoginStatus);
  const showModal = useSelector(getModalStatus);
  useEffect(() => {
    const body = document.querySelector('#root');
    if (menuActive) {
      disableBodyScroll(body);
    } else {
      enableBodyScroll(body);
    }
  }, [menuActive]);
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <div className={s.block}>
          <Logo />
          {!(isLogin && width < 1280) && (
            <div className={s.info}>
              <UserNav isLogin={isLogin} />
            </div>
          )}
          {isLogin && width > 767 && <UserInfo />}
          {isLogin && (
            <button
              type="button"
              className={s.burgerBtn}
              onClick={() => setMenuActive(!menuActive)}
            >
              {menuActive ? <Close /> : <Burger />}
            </button>
          )}
        </div>
        {(isLogin || showModal) && <AdditionalHeaderField />}
      </nav>
    </header>
  );
};

export default Header;
