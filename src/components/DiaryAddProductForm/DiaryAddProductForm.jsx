import useWindowDimensions from '../../services/hooks/useWindowDimensions';
import { Button, ButtonPlus } from '../';
import s from './DiaryAddProductForm.module.css';

const DiaryAddProductForm = ({ date }) => {
  const { width } = useWindowDimensions();

  const handleButtonClick = e => {
    e.preventDefault();
  };

  return (
    <form className={s.form}>
      <label className={s.label}>
        <input
          type="text"
          name="product"
          required
          placeholder="Enter product name"
          className={s.input}
        />
      </label>
      <label className={s.label}>
        <input
          type="number"
          name="weight"
          min="0"
          max="3000"
          required
          placeholder="Grams"
          className={s.input}
        />
      </label>

      {width < 768 && <Button text="Add" width={176} onClick={handleButtonClick} />}

      {width > 767 && <ButtonPlus onClick={handleButtonClick} />}
    </form>
  );
};

export default DiaryAddProductForm;
