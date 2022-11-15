import s from './Header.module.css';
import AuthNav from 'components/AuthNav/AuthNav';
import UserNav from 'components/UserNav/UserNav';

import Logo from 'components/Logo/Logo';

const Header = () => {
  return (
    <header className={s.header}>
      <Logo />
      <nav className={s.nav}>
        <AuthNav />
        <UserNav />
      </nav>
    </header>
  );
};

export default Header;
