import React, { useContext, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import Checkout from './Checkout';

const Cart = (props) => {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => cartCtx.removeItem(id);

  const cartItemAddHandler = (item) => cartCtx.addItem({ ...item, amount: 1 });

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const unexpectedTextError = 'Sth went wrong. Please try again later.';

  const handleSuccessfulSubmitOrderResponse = () => {
    cartCtx.clearCart();
    setDidSubmit(true);
  };

  const submitOrder = (userData) => {
    const url =
      'https://react-http-7aca5-default-rtdb.firebaseio.com/orders.json';
    const data = { user: userData, orderedItems: cartCtx.items };
    const config = { method: 'POST', body: JSON.stringify(data) };

    return fetch(url, config);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await submitOrder(userData);

      if (!response.ok) {
        throw new Error(unexpectedTextError);
      }
      const { name: id } = await response.json();

      if (!id) {
        throw new Error(unexpectedTextError);
      }

      handleSuccessfulSubmitOrderResponse();
    } catch ({ message }) {
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCartItem = (item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  );

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(renderCartItem)}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button-alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && hasItems ? (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      ) : (
        modalActions
      )}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const acceptCloseButton = (
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
  );

  const didSubmitModalContent = (
    <React.Fragment>
      <p>
        Successfully sent the order! U'll be contacted once we're done preparing
        your order.
      </p>
      {acceptCloseButton}
    </React.Fragment>
  );

  const isErrorModalContent = (
    <React.Fragment>
      <p>{error}</p>
      {acceptCloseButton}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!error && !isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!error && !isSubmitting && didSubmit && didSubmitModalContent}
      {error && isErrorModalContent}
    </Modal>
  );
};

export default Cart;
