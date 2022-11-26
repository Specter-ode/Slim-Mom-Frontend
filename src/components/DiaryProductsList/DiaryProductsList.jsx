import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDailyMeals } from 'redux/products/products-operations';
import { DiaryProductsItem } from 'components';

import s from './DiaryProductsList.module.css';

const DiaryProductsList = () => {
  const { dailyMeals, date, isLoading, error } = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!date) return;
    dispatch(getDailyMeals({ date: date }));
  }, [dispatch, date]);

  const showMeals = dailyMeals.length > 0 && !error && !isLoading;
  const noMeals = dailyMeals.length === 0 && !error && !isLoading;

  return (
    <ul className={s.list}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error. {error.message}</p>}
      {showMeals &&
        dailyMeals.map(i => (
          <DiaryProductsItem
            key={i._id}
            id={i._id}
            product={i.product}
            grams={i.grams}
            calories={i.calories}
          />
        ))}
      {noMeals && <li>You haven't added any meal this day.</li>}
    </ul>
  );
};

export default DiaryProductsList;
