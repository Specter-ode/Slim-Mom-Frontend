import s from '../DailyCalorieIntake/DailyCalorieIntake.module.css';

export default function DailyCalorieIntake() {
  return (
    <>
      <h2 className={s.title}>Your recommended daily calorie intake is</h2>
      <p className={s.textPrimary}>
        2800 <span className={s.textPrimarySpan}>kcal</span>
      </p>

      <p className={s.textSecondary}>Foods you should not eat</p>

      <ol className={s.list}>
        <li className={s.item}>
          <p>Flour products </p>
        </li>
        <li className={s.item}>
          <p>Milk</p>
        </li>
        <li className={s.item}>
          <p>Red meat</p>
        </li>
        <li className={s.item}>
          <p>Smoked meats</p>
        </li>
      </ol>
    </>
  );
}
