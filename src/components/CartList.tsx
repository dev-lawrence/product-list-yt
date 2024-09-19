import CartItem from "./CartItem";
import EmptyCartImg from "../assets/illustration-empty-cart.svg";
import CarbonImg from "../assets/icon-carbon-neutral.svg";
import PayButton from "./PayButton";
import { useContext } from "react";
import CartContext from "../CartContext";
import { CartContextProps } from "../libs/types";

const CartList = () => {
  const { products } = useContext(CartContext) as CartContextProps;
  const cartNotEmpty = products.length !== 0;

  const calculateSubTotal = () => {
    let subtotal = 0;

    products.forEach((product) => {
      subtotal += product.price * product.quantity!;
    });

    return subtotal;
  };

  return (
    <div className="mt-12 rounded-lg bg-white p-4 lg:h-fit">
      <h4 className="text-400 font-700 text-primary-red mb-6">
        Your Cart is ({products.length})
      </h4>

      {cartNotEmpty ? (
        products.map((product) => (
          <div
            key={product.id}
            className="border-b border-b-rose-300 py-4 first-of-type:pt-0"
          >
            <CartItem product={product} />
          </div>
        ))
      ) : (
        <div>
          <img className="mx-auto" src={EmptyCartImg} alt="Empty cart" />
          <p className="font-500 mt-6 text-center text-rose-500">
            Your added items will appear here
          </p>
        </div>
      )}

      {cartNotEmpty && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p>Order Total</p>
            <span className="text-300 font-700 lg:text-500 text-rose-900">
              {calculateSubTotal().toLocaleString("en-us", {
                style: "currency",
                currency: "usd",
              })}
            </span>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-rose-50">
            <img src={CarbonImg} alt="Carbon neutral" />
            <p>
              This is a{" "}
              <span className="font-500 text-rose-900">carbon neutral</span>{" "}
              delivery
            </p>
          </div>

          <PayButton products={products} />
        </div>
      )}
    </div>
  );
};

export default CartList;
