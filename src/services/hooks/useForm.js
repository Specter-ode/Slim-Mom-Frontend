import { useState } from 'react';

const useForm = ({ onSubmitClick, initialState, clearFields = true }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    const newValue = type === 'checkbox' ? checked : value;
    setState(prevState => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmitClick({ ...state });

    if (clearFields) {
      setState({ ...initialState });
    }
  };

  return { state, setState, handleChange, handleSubmit };
};

export default useForm;
