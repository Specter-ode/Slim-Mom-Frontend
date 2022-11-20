import s from './Header.module.css';
import AuthNav from 'components/AuthNav/AuthNav';
import UserNav from 'components/UserNav/UserNav';
import UserInfo from 'components/UserInfo/UserInfo';
import Logo from 'components/Logo/Logo';
import { ReactComponent as Burger } from 'assets/icons/burger.svg';
// import { useSelector } from 'react-redux';
// import { isLogin } from 'redux/auth/auth-selector';

const Header = ({ menuActive, setMenuActive }) => {
  // const isLoginIn = useSelector(isLogin);

  const isLogin = false;

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <div className={s.block}>
          <Logo />

          {isLogin ? (
            <>
              <UserNav />
              <p className={s.nickName}>Nick</p>
              <button type="button" className={s.exitBtn} onClick={() => {}}>
                Exit
              </button>
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
        <UserInfo />
      </nav>
    </header>
  );
};

export default Header;
