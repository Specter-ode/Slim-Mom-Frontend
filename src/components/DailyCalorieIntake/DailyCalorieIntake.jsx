import { useSelector } from 'react-redux';
import { getDailyIntake } from 'redux/auth/auth-selector';
import { Button } from 'components';
import { nanoid } from '@reduxjs/toolkit';
import s from '../DailyCalorieIntake/DailyCalorieIntake.module.css';

export default function DailyCalorieIntake() {
  const { calories, notRecomendedProducts } = useSelector(getDailyIntake);

  const productsNotAllowed = notRecomendedProducts?.map(el => (
    <li key={nanoid()} className={s.item}>
      <p className={s.text}>{el}</p>
    </li>
  ));

  return (
    <>
      <h2 className={s.title}>Your recommended daily calorie intake is</h2>
      <p className={s.textPrimary}>
        {calories} <span className={s.textPrimarySpan}>kcal</span>
      </p>

      <p className={s.textSecondary}>Foods you should not eat</p>

      <ol className={s.list}>{productsNotAllowed}</ol>

      <Button text="Start losing weight" width={210} />
    </>
  );
}
