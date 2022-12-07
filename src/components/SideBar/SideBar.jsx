import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getDailyMeals } from 'redux/products/products-operations';
import { DiaryDateСalendar } from '../';
import categories from '../../categories.json';
import s from './SideBar.module.css';

const SideBar = () => {
  const { dailyMeals, date } = useSelector(state => state.products);
  const { userDailyDiet } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [productsShown, setProductsShown] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [specificProducts, setSpecificProducts] = useState(null);

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
  const leftCalories =
    (dailyCalories - consumedCalories).toFixed(1) < 0
      ? 0
      : (dailyCalories - consumedCalories).toFixed(1);
  const percent = ((consumedCalories * 100) / dailyCalories).toFixed(2);

  const foodCategories = userDailyDiet?.categories?.map(i => {
    return getCategoryName(i);
  });

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

  const handleBtnClick = e => {
    if (e.target.textContent === activeCategory) {
      setProductsShown(false);
      setActiveCategory('');
      setSpecificProducts(null);
    } else {
      setActiveCategory(e.target.textContent);
      const productsToShow = userDailyDiet?.notAllowedProduct
        ?.filter(i => getCategoryName(i.category) === e.target.textContent)
        .sort((a, b) => a.title.localeCompare(b.title));
      setSpecificProducts(productsToShow);
      setProductsShown(true);
    }
  };

  return (
    <div className={s.sideBar}>
      <div className={s.box}>
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
            <ul className={s.list}>
              {foodCategories?.map((element, index) => (
                <li key={`not-recommended-categories-${index}`} className={s.item}>
                  <button type="button" onClick={handleBtnClick} className={s.button}>
                    {element}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {noInfo && <p>Your diet will be displayed here</p>}
        </section>
      </div>
      {showInfo && productsShown && (
        <section className={s.additional}>
          <h3 className={s.title}>Not recommended products in category {activeCategory}</h3>
          <ul className={s.productsList}>
            {specificProducts.map((element, index) => (
              <li key={`not-recommended-products-${index}`}>{element.title}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default SideBar;
