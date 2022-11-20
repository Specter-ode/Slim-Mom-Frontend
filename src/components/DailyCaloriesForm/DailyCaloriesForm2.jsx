import { Button, Modal } from 'components';
import s from '../DailyCaloriesForm/DailyCaloriesForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getModalStatus } from 'redux/auth/auth-selector';
import { updateModalStatus } from 'redux/auth/auth-slice';
import useForm from 'services/hooks/useForm';

const initialState = {
  height: '',
  age: '',
  currentWeight: '',
  desiredWeight: '',
  bloodType: '',
};
const DailyCaloriesForm2 = ({ handleSubmit }) => {
  const { state, onChange, onSubmit } = useForm({
    handleSubmit,
    initialState,
  });
  const { height, age, currentWeight, desiredWeight, bloodType } = state;
  const showModal = useSelector(getModalStatus);
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(updateModalStatus(!showModal));
  };
  return (
    <div className={s.div}>
      <h2 className={s.title}>Calculate your daily calorie intake right now</h2>
      <form className={s.form} onSubmit={onSubmit}>
        <div className={s.labelContainer}>
          <label className={s.label} htmlFor="height">
            <input
              className={s.input}
              onChange={onChange}
              value={height}
              type="number"
              name="height"
              placeholder="Height *"
              required
            />
          </label>

          <label className={s.label} htmlFor="age">
            <input
              className={s.input}
              onChange={onChange}
              value={age}
              type="number"
              name="age"
              placeholder="Age *"
              required
            />
          </label>

          <label className={s.label} htmlFor="currentWeight">
            <input
              className={s.input}
              onChange={onChange}
              value={currentWeight}
              type="number"
              name="currentWeight"
              placeholder="Current weight *"
              required
            />
          </label>

          <label className={s.label} htmlFor="desiredWeight">
            <input
              className={s.input}
              onChange={onChange}
              value={desiredWeight}
              type="number"
              name="desiredWeight"
              placeholder="Desired weight *"
              required
            />
          </label>

          <p className={s.text}>Blood type *</p>
          <div>
            <label className={s.labelRadio}>
              <input
                className={s.inputRadio}
                onChange={onChange}
                type="radio"
                name="bloodType"
                checked={bloodType === '1'}
                value="1"
              />
              <span className={s.numbers}>1</span>
            </label>

            <label className={s.labelRadio}>
              <input
                className={s.inputRadio}
                onChange={onChange}
                type="radio"
                name="bloodType"
                checked={bloodType === '2'}
                value="2"
              />
              <span className={s.numbers}>2</span>
            </label>

            <label className={s.labelRadio}>
              <input
                className={s.inputRadio}
                onChange={onChange}
                type="radio"
                name="bloodType"
                checked={bloodType === '3'}
                value="3"
              />
              <span className={s.numbers}>3</span>
            </label>

            <label className={s.labelRadio}>
              <input
                className={s.inputRadio}
                onChange={onChange}
                type="radio"
                name="bloodType"
                checked={bloodType === '4'}
                value="4"
              />
              <span className={s.numbers}>4</span>
            </label>
          </div>
        </div>
        <div className={s.buttonPosition}>
          <Button text="Start losing weight" width={210} onClick={() => toggleModal()} />
        </div>
      </form>
      {showModal && <Modal onClose={toggleModal} />}
    </div>
  );
};

export default DailyCaloriesForm2;
