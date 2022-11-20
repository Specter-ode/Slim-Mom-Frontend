import { useState } from 'react';

const useForm = ({ handleSubmit, initialState, clearFields = true }) => {
  const [state, setState] = useState({ ...initialState });

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setState(prevState => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit({ ...state });
    if (clearFields) {
      setState({ ...initialState });
    }
  };

  return { state, setState, onChange, onSubmit };
};

export default useForm;
