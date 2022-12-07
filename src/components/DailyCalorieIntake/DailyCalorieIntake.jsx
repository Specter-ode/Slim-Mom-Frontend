import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getDailyIntake, getUserDailyDiet, getLoginStatus } from 'redux/auth/auth-selector';
import { updateModalStatus } from 'redux/auth/auth-slice';
import { nanoid } from '@reduxjs/toolkit';

import s from '../DailyCalorieIntake/DailyCalorieIntake.module.css';

export default function DailyCalorieIntake() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getLoginStatus);
  const navigateTo = isLoggedIn ? '/diary' : '/registration';
  const getDiet = isLoggedIn ? getUserDailyDiet : getDailyIntake;
  const dailyDiet = useSelector(getDiet);

  const productsNotAllowed = dailyDiet?.notAllowedProduct?.map(el => (
    <li key={nanoid()} className={s.item}>
      <p className={s.text}>{el.title}</p>
    </li>
  ));

  return (
    <>
      <h2 className={s.title}>Your recommended daily calorie intake is</h2>
      <p className={s.textPrimary}>
        {dailyDiet?.calories} <span className={s.textPrimarySpan}>kcal</span>
      </p>
      <p className={s.textSecondary}>Foods you should not eat</p>
      <ol className={s.list}>{productsNotAllowed}</ol>
      <NavLink
        className={s.navLink}
        to={navigateTo}
        onClick={() => {
          dispatch(updateModalStatus(false));
        }}
      >
        Start losing weight
      </NavLink>
    </>
  );
}
