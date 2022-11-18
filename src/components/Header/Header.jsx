import s from './Header.module.css';
import AuthNav from 'components/AuthNav/AuthNav';
import UserNav from 'components/UserNav/UserNav';
import UserInfo from 'components/UserInfo/UserInfo';
import Logo from 'components/Logo/Logo';
import { useSelector } from 'react-redux';
import { isLogin } from 'redux/auth/auth-selector';

const Header = () => {
  // const isLoginIn = useSelector(isLogin);
  // console.log('isLogin: ', isLogin);
  const isLoginIn = true;
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <div className={s.block}>
          <Logo />

          {isLoginIn ? (
            <>
              <UserNav />
              <p className={s.nickName}>Nick</p>
              <button className={s.ExitBtn} onClick={() => {}}>
                Exit
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
