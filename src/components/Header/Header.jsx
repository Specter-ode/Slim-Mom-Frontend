import s from './Header.module.css';
import AuthNav from 'components/AuthNav/AuthNav';
import UserNav from 'components/UserNav/UserNav';
import UserInfo from 'components/UserInfo/UserInfo';
import Logo from 'components/Logo/Logo';

const Header = () => {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <div className={s.block}>
          <Logo />
          <AuthNav />
          <UserNav />
        </div>
        <UserInfo />
      </nav>
    </header>
  );
};

export default Header;
