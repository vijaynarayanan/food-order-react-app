import { useDispatch } from "react-redux";
import { cartSlice } from "../../../store/cart-slice";
import classes from "./MealItem.module.css";
import { MealItemForm } from "./MealItemForm";

const MealItem = (props) => {
  const dispatch = useDispatch();
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    dispatch(
      cartSlice.actions.addItems({
        item: {
          id: props.id,
          name: props.name,
          amount: amount,
          price: props.price,
        },
      })
    );
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
