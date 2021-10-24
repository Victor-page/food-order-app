/**
 * creates and returns a validation rule object that
 * is used by useForm hook to validate the form inputs
 *
 * @param {string} ruleName - name of the validation rule
 * @param {string} errorMessage - message to display
 * @param {function} validateFunc - validation function
 */
const createValidationRule = (ruleName, errorMessage, validateFunc) => ({
  name: ruleName,
  message: errorMessage,
  validate: validateFunc,
});

export const requiredRule = (inputName) =>
  createValidationRule(
    'required',
    `${inputName} required`,
    (inputValue) => inputValue.length !== 0
  );

export const minLengthRule = (inputName, minCharacters) =>
  createValidationRule(
    'minLength',
    `${inputName} should contain atleast ${minCharacters} characters`,
    (inputValue) => inputValue.length >= minCharacters
  );

export const maxLengthRule = (inputName, maxCharacters) =>
  createValidationRule(
    'minLength',
    `${inputName} cannot contain more than ${maxCharacters} characters`,
    (inputValue) => inputValue.length <= maxCharacters
  );
