import { useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../../store/cart-slice";
import { Modal } from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

export const Cart = (props) => {
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount) || 0;
  const dispatch = useDispatch();

  const cartItemRemoveHandler = (id) => {
    dispatch(cartSlice.actions.removeItems({ id }));
  };
  const cartItemAddHandler = (item) => {
    dispatch(
      cartSlice.actions.addItems({
        item: {
          id: item.id,
          name: item.name,
          amount: 1,
          price: item.price,
        },
      })
    );
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <li>
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        </li>
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {items.length > 0 && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};
