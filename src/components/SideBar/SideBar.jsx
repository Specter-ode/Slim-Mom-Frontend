import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getDailyMeals } from 'redux/products/products-operations';
import { Button, DiaryDateСalendar } from '../';
import categories from '../../categories.json';
import s from './SideBar.module.css';

const SideBar = () => {
  const { dailyMeals, date } = useSelector(state => state.products);
  const { userDailyDiet } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [categoriesShown, setCategoriesShown] = useState(true);
  const [btnText, setBtnText] = useState('Show specific products');

  useEffect(() => {
    if (dailyMeals) return;
    if (!date) return;
    dispatch(getDailyMeals({ date: date }));
  }, [dispatch, date, dailyMeals]);

  const getCategoryName = i => {
    return categories[i];
  };

  const dailyCalories = Number(userDailyDiet?.calories).toFixed(1);
  const consumedCalories = dailyMeals
    ?.reduce((total, meal) => {
      return total + meal.calories;
    }, 0)
    ?.toFixed(1);
  const leftCalories = (dailyCalories - consumedCalories).toFixed(1);
  const percent = ((consumedCalories * 100) / dailyCalories).toFixed(2);

  const foodCategories = userDailyDiet?.categories?.map(i => {
    return getCategoryName(i);
  });

  const specificProducts = userDailyDiet?.notAllowedProduct
    ?.map(x => x)
    .sort((a, b) => a.localeCompare(b));

  const showInfo =
    userDailyDiet?.calories &&
    userDailyDiet?.notAllowedProduct?.length > 0 &&
    userDailyDiet?.categories?.length > 0;
  const showDailyInfo =
    dailyMeals?.length > 0 &&
    userDailyDiet?.calories &&
    userDailyDiet?.notAllowedProduct &&
    userDailyDiet?.categories;
  const noInfo =
    !userDailyDiet ||
    !userDailyDiet?.calories ||
    !userDailyDiet?.notAllowedProduct ||
    !userDailyDiet?.categories;

  const handleBtnClick = () => {
    switch (categoriesShown) {
      case true:
        setCategoriesShown(false);
        setBtnText('Show food categories');
        break;
      case false:
        setCategoriesShown(true);
        setBtnText('Show specific products');
        break;

      default:
        return;
    }
  };

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
              <p>{showDailyInfo ? leftCalories : '000'} kcal</p>
            </li>
            <li className={s.item}>
              <p>Consumed</p>
              <p>{showDailyInfo ? consumedCalories : '000'} kcal</p>
            </li>
            <li className={s.item}>
              <p>Daily rate</p>
              <p>{userDailyDiet.calories} kcal</p>
            </li>
            <li className={s.item}>
              <p>n% of normal</p>
              <p>{showDailyInfo ? percent : 0} %</p>
            </li>
          </ul>
        )}
      </section>
      <section className={s.section}>
        <h2 className={s.title}>Food not recommended</h2>
        {showInfo && (
          <>
            {categoriesShown ? (
              <ul className={s.text}>
                {foodCategories?.map((element, index) => (
                  <li key={`not-recommended-categories-${index}`} className={s.text__item}>
                    {element}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={s.text}>
                {specificProducts.map((element, index) => (
                  <li key={`not-recommended-products-${index}`}>{element}</li>
                ))}
              </ul>
            )}
            <Button text={btnText} width={240} onClick={handleBtnClick} />
          </>
        )}

        {noInfo && <p>Your diet will be displayed here</p>}
      </section>
    </div>
  );
};

export default SideBar;
