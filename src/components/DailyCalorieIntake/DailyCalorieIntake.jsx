import { useSelector } from 'react-redux';
import { getDailyIntake, getLoginStatus } from 'redux/auth/auth-selector';

import { NavLink } from 'react-router-dom';

import { nanoid } from '@reduxjs/toolkit';
import s from '../DailyCalorieIntake/DailyCalorieIntake.module.css';

export default function DailyCalorieIntake() {
  const { calories, notRecomendedProducts } = useSelector(getDailyIntake);
  const isLoggedIn = useSelector(getLoginStatus);

  const navigateTo = isLoggedIn ? '/diary' : '/registration';

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
      <NavLink className={s.navLink} to={navigateTo}>
        Start losing weight
      </NavLink>
    </>
  );
}
