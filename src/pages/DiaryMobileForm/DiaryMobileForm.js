import { useParams } from 'react-router-dom';

import { DiaryAddProductForm } from '../../components';
import s from './DiaryMobileForm.module.css';

const DiaryMobileForm = () => {
  const { date } = useParams();

  console.log('date: ', date);
  return (
    <main className={s.main}>
      <DiaryAddProductForm date={date} />
    </main>
  );
};

export default DiaryMobileForm;
