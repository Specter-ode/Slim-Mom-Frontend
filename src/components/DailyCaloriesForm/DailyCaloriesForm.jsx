import {
  useState,
  // useEffect
} from 'react';
import { Button, Modal } from 'components';

import s from '../DailyCaloriesForm/DailyCaloriesForm.module.css';

export default function DailyCaloriesForm() {
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [firstType, setFirstType] = useState(false);
  const [secondType, setSecondType] = useState(false);
  const [thirdType, setThirdType] = useState(false);
  const [fourthType, setFourthType] = useState(false);

  // const [bloodType, setBloodType] = useState([]);

  // const arrayBloodType = [null, false, true, false, false];
  // console.log('arrayBloodType', arrayBloodType);

  // const arrayRadio = [false, true, false, true];
  // console.log('array', arrayRadio);

  // const data = [
  //   {
  //     _id: {
  //       $oid: '5d51694802b2373622ff553b',
  //     },
  //     categories: ['яйца'],
  //     weight: 100,
  //     title: {
  //       ru: 'Яйцо куриное (желток сухой)',
  //       ua: 'Яйце куряче (жовток сухий)',
  //     },
  //     calories: 623,
  //     groupBloodNotAllowed: [null, true, false, false, false],
  //     __v: 0,
  //   },
  //   {
  //     _id: {
  //       $oid: '5d51694802b2373622ff554d',
  //     },
  //     categories: ['зерновые'],
  //     weight: 100,
  //     title: {
  //       ru: 'Горох маш Ярмарка Платинум',
  //       ua: 'Горох маш Ярмарка Платинум',
  //     },
  //     calories: 312,
  //     groupBloodNotAllowed: [null, true, false, false, false],
  //     __v: 0,
  //   },
  //   {
  //     _id: {
  //       $oid: '5d51694802b2373622ff555c',
  //     },
  //     categories: ['зерновые'],
  //     weight: 100,
  //     title: {
  //       ru: 'Гречневая крупа (ядрица) зелёная',
  //       ua: 'Гречана крупа (ядриця) зелена',
  //     },
  //     calories: 296,
  //     groupBloodNotAllowed: [null, true, false, true, true],
  //     __v: 0,
  //   },
  // ];
  // const test = () => {
  //   // if (arrayBloodType[1] === arrayRadio[0] && arrayBloodType[1] === true) {
  //   //   console.log('Первый эелемент прошел условия!');
  //   // } else if (arrayBloodType[2] === arrayRadio[1] && arrayBloodType[2] === true) {
  //   //   console.log('Второй элемент прошел условия!');
  //   // } else if (arrayBloodType[3] === arrayRadio[2] && arrayBloodType[3] === true) {
  //   //   console.log('Третий элемент прошел условия!');
  //   // } else if (arrayBloodType[4] === arrayRadio[3] && arrayBloodType[4] === true) {
  //   //   console.log('Четвертый элемент прошел условия!');
  //   // }
  //   // for (let index = 0; index < arrayBloodType.length; index++) {
  //   //   const element = arrayBloodType[index];
  //   //   // console.log('element', element);
  //   //   if (element === firstType && element === true) {
  //   //     console.log('Первый эелемент прошел условия!', element);
  //   //     console.log('secondType не прошел условие', secondType);
  //   //     console.log('thirdType не прошел условие', secondType);
  //   //     console.log('fourthType не прошел условие', secondType);
  //   //   } else if (element === secondType && element === true) {
  //   //     console.log('Второй эелемент прошел условия!', element);
  //   //   } else if (element === thirdType && element === true) {
  //   //     console.log('Третий эелемент прошел условия!', element);
  //   //   } else if (element === fourthType && element === true) {
  //   //     console.log('Четвертый эелемент прошел условия!', element);
  //   //   }
  //   // }
  //   // arrayBloodType.map(el => {
  //   //   if (el !== null) {
  //   //     console.log('el', el);
  //   //     console.log('el === firstTupe', el === firstType);
  //   //   }
  //   // });
  // };

  // test();

  // console.log('firstType', firstType);
  // console.log('secondType', secondType);
  // console.log('thirdType', thirdType);
  // console.log('fourthType', fourthType);

  // useEffect(() => {
  //   setBloodType(prevState => console.log('prevState', prevState));
  // }, []);

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  // setBloodType(prevState => console.log('prevState', prevState));
  // console.log('bloodType', bloodType);

  const handleInputChange = ({ target: { name, value } }) => {
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
        setFirstType(true);
        setSecondType(false);
        setThirdType(false);
        setFourthType(false);
        break;
      case 'secondType':
        setFirstType(false);
        setSecondType(true);
        setThirdType(false);
        setFourthType(false);
        break;
      case 'thirdType':
        setFirstType(false);
        setSecondType(false);
        setThirdType(true);
        setFourthType(false);
        break;
      case 'fourthType':
        setFirstType(false);
        setSecondType(false);
        setThirdType(false);
        setFourthType(true);
        break;
      default:
        return;
    }
  };

  return (
    <div className={s.div}>
      <h2 className={s.title}>Calculate your daily calorie intake right now</h2>
      <form>
        <div className={s.labelContainer}>
          <label className={s.label} htmlFor="height">
            <input
              className={s.input}
              onChange={handleInputChange}
              value={height}
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
              id="desiredWeight"
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
                onChange={handleInputChange}
                type="radio"
                name="firstType"
                checked={firstType}
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
                checked={secondType}
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
                checked={thirdType}
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
                checked={fourthType}
                value={4}
              />

              <span className={s.numbers}>4</span>
            </label>
          </div>
        </div>
        <div className={s.buttonPosition}>
          <Button text="Start losing weight" width={210} onClick={toggleModal} />
        </div>
      </form>

      {showModal && <Modal onClose={toggleModal} />}
    </div>
  );
}
