import { useEffect } from 'react';
import s from './SideBar.module.css';

const SideBar = ({ date }) => {
  useEffect(() => {
    // если в календаре поменяется дата,то сработает useEffect и нужно делать запрос на бэк
  }, [date]);
  return <div className={s.sideBar}></div>;
};

export default SideBar;
