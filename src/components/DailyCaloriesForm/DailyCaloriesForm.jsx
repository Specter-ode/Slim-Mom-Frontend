import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'components';
import { toast } from 'react-toastify';

import { getCalorieIntake } from 'redux/auth/auth-operations';

import s from '../DailyCaloriesForm/DailyCaloriesForm.module.css';

export default function DailyCaloriesForm() {
  const dispatch = useDispatch();

  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('');
  const [bloodType, setBloodType] = useState('');

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(state => !state);
    document.body.style.overflowY = 'visible';
  };

  const handleInputChange = ({ target: { name, value, checked = false } }) => {
    const isButtonChecked = checked ? value : '';

    switch (name) {
      case 'height':
        setHeight(value);
        break;

      case 'age':
        setAge(value);
        break;

      case 'currentWeight':
        setCurrentWeight(value);
        break;

      case 'desiredWeight':
        setDesiredWeight(value);
        break;

      case 'firstType':
        setBloodType(isButtonChecked);
        break;

      case 'secondType':
        setBloodType(isButtonChecked);
        break;

      case 'thirdType':
        setBloodType(isButtonChecked);
        break;

      case 'fourthType':
        setBloodType(isButtonChecked);
        break;

      default:
        return;
    }
  };

  const onFormSubmit = event => {
    event.preventDefault();

    if (bloodType !== '') {
      setHeight('');
      setAge('');
      setCurrentWeight('');
      setDesiredWeight('');
      setBloodType('');

      dispatch(
        getCalorieIntake({
          height,
          age,
          currentWeight,
          desiredWeight,
          bloodType,
        })
      );

      toggleModal();
    } else {
      toast.warn('Please сhoose your blood type');
    }
  };

  return (
    <div className={s.formContainer}>
      <h2 className={s.title}>Calculate your daily calorie intake right now</h2>
      <form className={s.form} onSubmit={onFormSubmit}>
        <div className={s.labelContainer}>
          <label className={s.label} htmlFor="height">
            <input
              className={s.input}
              onChange={handleInputChange}
              value={height}
              min="100"
              max="300"
              id="height"
              type="number"
              name="height"
              placeholder="Height *"
              required
            />
          </label>

          <label className={s.label} htmlFor="age">
            <input
              className={s.input}
              onChange={handleInputChange}
              value={age}
              min="6"
              max="130"
              id="age"
              type="number"
              name="age"
              placeholder="Age *"
              required
            />
          </label>

          <label className={s.label} htmlFor="currentWeight">
            <input
              className={s.input}
              onChange={handleInputChange}
              value={currentWeight}
              min="40"
              max="270"
              id="currentWeight"
              type="number"
              name="currentWeight"
              placeholder="Current weight *"
              required
            />
          </label>

          <label className={s.label} htmlFor="desiredWeight">
            <input
              className={s.input}
              onChange={handleInputChange}
              value={desiredWeight}
              min="40"
              max="270"
              id="desiredWeight"
              type="number"
              name="desiredWeight"
              placeholder="Desired weight *"
              required
            />
          </label>

          <p className={s.textBloodType}>Blood type *</p>

          <div>
            <label className={s.labelRadio}>
              <input
                className={s.inputRadio}
                onChange={handleInputChange}
                type="radio"
                name="firstType"
                checked={bloodType === '1'}
                value={1}
              />

              <span className={s.numbers}>1</span>
            </label>
            <label className={s.labelRadio}>
              <input
                className={s.inputRadio}
                onChange={handleInputChange}
                type="radio"
                name="secondType"
                checked={bloodType === '2'}
                value={2}
              />

              <span className={s.numbers}>2</span>
            </label>
            <label className={s.labelRadio}>
              <input
                className={s.inputRadio}
                onChange={handleInputChange}
                type="radio"
                name="thirdType"
                checked={bloodType === '3'}
                value={3}
              />

              <span className={s.numbers}>3</span>
            </label>
            <label className={s.labelRadio}>
              <input
                className={s.inputRadio}
                onChange={handleInputChange}
                type="radio"
                name="fourthType"
                checked={bloodType === '4'}
                value={4}
              />

              <span className={s.numbers}>4</span>
            </label>
          </div>
        </div>
        <div className={s.buttonPosition}>
          <Button text="Start losing weight" width={210} />
        </div>
      </form>

      {showModal && <Modal onClose={toggleModal} />}
    </div>
  );
}
