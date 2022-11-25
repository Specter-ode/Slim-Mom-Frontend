import { useEffect } from 'react';
import { DiaryProductsItem } from 'components';
import s from './DiaryProductsList.module.css';

const DiaryProductsList = ({ date }) => {
  useEffect(() => {
    // если в календаре поменяется дата,то сработает useEffect и нужно делать запрос на бэк
  }, [date]);
  // const elements = products.map(el => {});

  return (
    <ul className={s.list}>
      <DiaryProductsItem />
      <DiaryProductsItem />
      <DiaryProductsItem />
      <DiaryProductsItem />
    </ul>
  );
};

export default DiaryProductsList;
