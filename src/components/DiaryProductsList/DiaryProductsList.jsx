import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDailyMeals } from 'redux/products/products-operations';
import { DiaryProductsItem, Loader } from 'components';

import s from './DiaryProductsList.module.css';

const DiaryProductsList = () => {
  const { dailyMeals, date, isLoading, error } = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!date) return;
    dispatch(getDailyMeals({ date: date }));
  }, [dispatch, date]);

  const showMeals = dailyMeals?.length > 0 && !error && !isLoading;
  const noMeals = dailyMeals?.length === 0 && !error && !isLoading;

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>Error. {error.message}</p>}
      {showMeals && (
        <ul className={s.list}>
          {dailyMeals.map(i => (
            <DiaryProductsItem
              key={i._id}
              id={i._id}
              product={i.product}
              grams={i.grams}
              calories={i.calories}
            />
          ))}
        </ul>
      )}
      {noMeals && <p className={s.error}>You haven't added any meal this day.</p>}
    </>
  );
};

export default DiaryProductsList;
