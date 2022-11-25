const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1.21,
    color: '#9b9faa',
    backgroundColor: state.isFocused ? '#212121' : '#fff',
    '&:hover': {
      backgroundColor: state.isFocused ? '#212121' : '#fff',
      color: '#fff',
    },
  }),
  singleValue: provided => ({
    ...provided,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.21,
    color: '#9b9faa',
    position: 'absolute',
    bottom: 8,
    '@media only screen and (min-width: 768px)': {
      bottom: 20,
    },
  }),
  control: (provide, state) => ({
    borderBottom: '1 solid #fc842d',
    borderBottomColor: state.isFocused ? '#212121' : '#fc842d',
    width: 280,
    '@media only screen and (min-width: 768px)': {
      width: 240,
    },
  }),
  // dropdownIndicator: () => ({
  //   display: 'none',
  // }),
  container: provided => ({
    ...provided,
    borderBottom: '1px solid #e0e0e0',
    maxHeight: 50,
    position: 'relative',
    '@media only screen and (min-width: 768px)': {
      marginRight: 22,
    },
  }),
  valueContainer: () => ({
    marginBottom: 0,
    padding: 0,
    height: 25,
    '@media only screen and (min-width: 768px)': {
      marginRight: 37,
    },
  }),

  placeholder: () => ({
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 700,
    lineHeight: 1.21,
    color: '#9b9faa',
    position: 'absolute',
    bottom: 8,
    '@media only screen and (min-width: 768px)': {
      bottom: 20,
    },
  }),
  indicatorsContainer: () => ({
    display: 'none',
  }),

  input: () => ({
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.21,
    color: '#9b9faa',
    position: 'absolute',
    bottom: 8,
    '@media only screen and (min-width: 768px)': {
      bottom: 20,
    },
  }),
  menu: provided => ({
    ...provided,
    margin: 0,
  }),
};

export default selectStyles;
