import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
  const { label, type, name, handleChange, errorMessage, isValid, value } =
    props;

  return (
    <div className={classes.inputContainer}>
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        className={classes.input}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
      {errorMessage && !isValid && (
        <span className={classes.error}>{errorMessage}</span>
      )}
    </div>
  );
};

export default React.memo(Input);
