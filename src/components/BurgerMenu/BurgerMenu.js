import s from './BurgerMenu.module.css';

import { NavLink } from 'react-router-dom';
import { links } from '../UserNav/links';

const getLinkClassName = ({ isActive }) => {
  console.log('isActive: ', isActive);
  return isActive ? s.activeLink : s.link;
};
const isActiveBurgerMenu = ({ menuActive }) => {
  return menuActive ? s.menuActive : s.menu;
};

const BurgerMenu = () => {
  const elements = links.map(({ id, to, text }) => (
    <li className={s.item} key={id}>
      <NavLink className={getLinkClassName} to={to}>
        {text}
      </NavLink>
    </li>
  ));
  return (
    <div className={isActiveBurgerMenu}>
      <div className={s.menuContent}>
        <ul className={s.nav}>{elements}</ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
