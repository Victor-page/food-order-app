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
      requiredRule('Name'),
      minLengthRule('Name', 3),
      maxLengthRule('Name', 25),
    ],
  },
  email: {
    ...createFormFieldConfig('Email', 'email', 'email'),
    validationRules: [
      requiredRule('Email'),
      minLengthRule('Email', 10),
      maxLengthRule('Email', 25),
    ],
  },
  street: {
    ...createFormFieldConfig('Street', 'street', 'text'),
    validationRules: [
      requiredRule('Street'),
      minLengthRule('Street', 5),
      maxLengthRule('Street', 50),
    ],
  },
  postalCode: {
    ...createFormFieldConfig('Postal Code', 'postalCode', 'text'),
    validationRules: [
      requiredRule('Postal Code'),
      minLengthRule('Postal Code', 5),
      maxLengthRule('Postal Code', 5),
    ],
  },
  city: {
    ...createFormFieldConfig('City', 'city', 'text'),
    validationRules: [
      requiredRule('City'),
      minLengthRule('City', 2),
      maxLengthRule('City', 50),
    ],
  },
};
