import s from './UserNav.module.css';
import { NavLink } from 'react-router-dom';

import { links } from './links';

const getLinkClassName = ({ isActive }) => {
  return isActive ? s.activeLink : s.link;
};

function UserNav({ isLogin }) {
  const selectLinks = isLogin
    ? links.filter(item => item.private)
    : links.filter(item => !item.private);
  const elements = selectLinks.map(({ id, to, text }) => (
    <li className={s.item} key={id}>
      <NavLink className={getLinkClassName} to={to}>
        {text}
      </NavLink>
    </li>
  ));

  return <ul className={s.nav}>{elements}</ul>;
}

export default UserNav;
