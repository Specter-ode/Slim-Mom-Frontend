import s from './AuthNav.module.css';
import { NavLink } from 'react-router-dom';

const getLinkClassName = ({ isActive }) => {
  return isActive ? s.activeLink : s.link;
};
const AuthNav = () => {
  return (
    <div>
      <NavLink to="/login" className={getLinkClassName}>
        Sign in
      </NavLink>
      <NavLink to="/register" className={getLinkClassName}>
        Registration
      </NavLink>
    </div>
  );
};

export default AuthNav;
