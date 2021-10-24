import React from 'react';
import Input from '../components/Cart/Input/Input';

import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from './inputValidationRules';

/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 */
const createFormFieldConfig = (label, name, type, defaultValue = '') => ({
  renderInput: (handleChange, value, isValid, error, key) => {
    return (
      <Input
        key={key}
        name={name}
        type={type}
        label={label}
        isValid={isValid}
        value={value}
        handleChange={handleChange}
        errorMessage={error}
      />
    );
  },
  label,
  value: defaultValue,
  valid: false,
  errorMessage: '',
  touched: false,
});

// object representation of signup form
export const form = {
  name: {
    ...createFormFieldConfig('Full Name', 'name', 'text'),
    validationRules: [
      requiredRule('name'),
      minLengthRule('name', 3),
      maxLengthRule('name', 25),
    ],
  },
  email: {
    ...createFormFieldConfig('Email', 'email', 'email'),
    validationRules: [
      requiredRule('email'),
      minLengthRule('email', 10),
      maxLengthRule('email', 25),
    ],
  },
  street: {
    ...createFormFieldConfig('Street', 'street', 'text'),
    validationRules: [
      requiredRule('street'),
      minLengthRule('street', 5),
      maxLengthRule('street', 50),
    ],
  },
  postal: {
    ...createFormFieldConfig('Postal Code', 'postal', 'text'),
    validationRules: [
      requiredRule('postal'),
      minLengthRule('postal', 5),
      maxLengthRule('postal', 5),
    ],
  },
  city: {
    ...createFormFieldConfig('City', 'city', 'text'),
    validationRules: [
      requiredRule('city'),
      minLengthRule('city', 2),
      maxLengthRule('city', 50),
    ],
  },
};
