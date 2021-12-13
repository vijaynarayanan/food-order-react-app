import { useDispatch, useSelector } from "react-redux";
import { Cart } from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import { cartSlice } from "./store/cart-slice";

function App() {
  const showCart = useSelector((state) => state.cart.showCart);
  const dispatch = useDispatch();

  const showCartHandler = () => {
    dispatch(cartSlice.actions.toggleCart());
  };

  return (
    <>
      {showCart && <Cart onClose={showCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
