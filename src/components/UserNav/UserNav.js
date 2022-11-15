import s from './UserNav.module.css';
import { NavLink } from 'react-router-dom';
import UserInfo from 'components/UserInfo/UserInfo';
import { links } from './links';

const getLinkClassName = ({ isActive }) => {
  return isActive ? s.activeLink : s.link;
};

function UserNav({ isAuth }) {
  const selectLinks = isAuth ? links : links.filter(item => !item.private);
  const elements = selectLinks.map(({ id, to, text }) => (
    <li className={s.item} key={id}>
      <NavLink className={getLinkClassName} to={to}>
        {text}
      </NavLink>
    </li>
  ));

  return (
    <>
      <ul className={s.nav}>{elements}</ul>
      <UserInfo />
    </>
  );
}

export default UserNav;
