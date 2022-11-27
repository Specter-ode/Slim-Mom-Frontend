import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getDailyMeals } from 'redux/products/products-operations';
import { DiaryDateСalendar } from '../';
import s from './SideBar.module.css';

const SideBar = () => {
  const { dailyMeals, date } = useSelector(state => state.products);
  const { userDailyDiet } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dailyMeals) return;
    if (!date) return;
    dispatch(getDailyMeals({ date: date }));
  }, [dispatch, date, dailyMeals]);

  const dailyCalories = Number(userDailyDiet?.calories).toFixed(1);
  const consumedCalories = dailyMeals?.reduce((total, meal) => {
    return total + meal.calories;
  }, 0);
  const leftCalories = (dailyCalories - consumedCalories).toFixed(1);
  const percent = ((consumedCalories * 100) / dailyCalories).toFixed(2);

  const foodCategories = userDailyDiet?.notRecomendedProducts?.join(', ');

  const showInfo = dailyMeals && userDailyDiet?.calories && userDailyDiet?.notRecomendedProducts;
  const noInfo = !userDailyDiet?.calories && !userDailyDiet?.notRecomendedProducts;

  return (
    <div className={s.sideBar}>
      <section className={s.section}>
        <h2 className={s.title}>
          Summary for <DiaryDateСalendar location="sidebar" />
        </h2>
        {noInfo && (
          <p>Please fill out the form on the Calculator page to see your personal statistics.</p>
        )}
        {showInfo && (
          <ul className={s.list}>
            <li className={s.item}>
              <p>Left</p>
              <p>{leftCalories} kcal</p>
            </li>
            <li className={s.item}>
              <p>Consumed</p>
              <p>{consumedCalories} kcal</p>
            </li>
            <li className={s.item}>
              <p>Daily rate</p>
              <p>{userDailyDiet.calories} kcal</p>
            </li>
            <li className={s.item}>
              <p>n% of normal</p>
              <p>{percent} %</p>
            </li>
          </ul>
        )}
      </section>
      <section className={s.section}>
        <h2 className={s.title}>Food not recommended</h2>
        {showInfo && <p>{foodCategories}</p>}

        {noInfo && <p>Your diet will be displayed here</p>}
      </section>
    </div>
  );
};

export default SideBar;
