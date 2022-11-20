import { useEffect } from 'react';
import s from './DiaryProductsList.module.css';

const DiaryProductsList = ({ date }) => {
  useEffect(() => {
    // если в календаре поменяется дата,то сработает useEffect и нужно делать запрос на бэк
  }, [date]);
  // const elements = products.map(el => {});

  return <ul className={s.list}></ul>;
};

export default DiaryProductsList;
