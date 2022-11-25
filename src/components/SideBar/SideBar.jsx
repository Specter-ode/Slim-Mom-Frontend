import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import s from './SideBar.module.css';

const SideBar = () => {
  const { date } = useSelector(state => state.products);

  useEffect(() => {
    // если в календаре поменяется дата,то сработает useEffect и нужно делать запрос на бэк
  }, [date]);
  return (
    <div className={s.sideBar}>
      <section className={s.section}>
        <h2 className={s.title}>Summary for 06/20/2020</h2>
        <ul className={s.list}>
          <li className={s.item}>
            <p>Left</p>
            <p>000 kcal</p>
          </li>
          <li className={s.item}>
            <p>Consumed</p>
            <p>000 kcal</p>
          </li>
          <li className={s.item}>
            <p>Daily rate</p>
            <p>000 kcal</p>
          </li>
          <li className={s.item}>
            <p>n% of normal</p>
            <p>000 kcal</p>
          </li>
        </ul>
      </section>
      <section className={s.section}>
        <h2 className={s.title}>Food not recommended</h2>
        <p>Your diet will be displayed here</p>
      </section>
    </div>
  );
};

export default SideBar;
