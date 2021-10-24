import useForm from '../../hooks/useForm';
import { form } from '../../utils/formConfig';

import classes from './Checkout.module.css';

const Checkout = (props) => {
  const { renderFormInputs, isFormValid, getInputValues } = useForm(form);

  const confirmHandler = (event) => {
    event.preventDefault();
    const inputValues = getInputValues();
    props.onConfirm(inputValues);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      {renderFormInputs()}

      <div className={classes.actions}>
        <button
          type="button"
          className={classes.button}
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button className={classes.button} disabled={!isFormValid()}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
