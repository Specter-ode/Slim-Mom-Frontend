import s from './Header.module.css';
import { AdditionalHeaderField, AuthNav, UserNav, UserInfo, Logo } from 'components';
import { ReactComponent as Burger } from 'assets/icons/burger.svg';
import useWindowDimensions from 'services/hooks/useWindowDimensions';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { isLogin } from 'redux/auth/auth-selector';

const Header = ({ menuActive, setMenuActive }) => {
  const { width } = useWindowDimensions();
  // const isLoginIn = useSelector(isLogin);

  useEffect(() => {
    const body = document.querySelector('#root');
    if (menuActive) {
      disableBodyScroll(body);
    } else {
      enableBodyScroll(body);
    }
  }, [menuActive]);
  const isLogin = false;

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <div className={s.block}>
          <Logo />
          {isLogin ? (
            <>
              <UserNav />
              {width > 767 && <UserInfo />}
              <button
                type="button"
                className={s.burgerBtn}
                onClick={() => setMenuActive(!menuActive)}
              >
                <Burger />
              </button>
            </>
          ) : (
            <AuthNav />
          )}
        </div>
        {/* <AdditionalHeaderField /> */}
      </nav>
    </header>
  );
};

export default Header;
