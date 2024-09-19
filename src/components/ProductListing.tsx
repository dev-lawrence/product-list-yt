import { CartContextProps, ProductItem } from "../libs/types";
import CartIcon from "../assets/icon-add-to-cart.svg";
import CartContext from "../CartContext";
import { useContext, useEffect, useState } from "react";

interface ProductListingProps {
  product: ProductItem;
}

const ProductListing = ({ product }: ProductListingProps) => {
  const { id, name, category, price, image } = product;
  const {
    products,
    addToCart,
    reduceCartQuantity,
    isItemInCart,
    removeFromCart,
  } = useContext(CartContext) as CartContextProps;
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cartProduct = products.find((product) => product.id === id);
    if (cartProduct) {
      setQuantity(cartProduct.quantity!);
    }
  }, [products, id]);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    addToCart(id, name, price, image);
  };

  const reduceQuantity = () => {
    if (quantity > 1) {
      reduceCartQuantity(id);
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      removeFromCart(id);
      setQuantity(0);
    }
  };

  return (
    <div className="[&:not(:last-child)]:mb-8">
      <div className="relative mb-4">
        <img
          className={`rounded-md ${isItemInCart(id) ? "border-primary-red border-2" : ""}`}
          src={image}
          alt={name}
        />

        {!isItemInCart(id) ? (
          <button
            onClick={() => addToCart(id, name, price, image)}
            className="border-text-rose-500 hover:border-primary-red group absolute bottom-[-1rem] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-rose-50 px-4 py-2 transition-colors duration-300 lg:w-[150px]"
          >
            <img src={CartIcon} alt="Add to cart" />
            <span className="font-500 group-hover:text-primary-red text-rose-900 transition-colors duration-300">
              Add to cart
            </span>
          </button>
        ) : (
          <div className="bg-primary-red absolute bottom-[-1rem] left-1/2 flex w-1/2 -translate-x-1/2 items-center justify-between gap-2 rounded-full px-4 py-2 text-white lg:w-[170px]">
            <button
              onClick={reduceQuantity}
              className="hover:text-primary-red flex size-[20px] items-center justify-center rounded-full border transition-colors duration-300 hover:bg-white"
            >
              <i className="fa-solid fa-minus text-[0.9rem] leading-[20px]"></i>
            </button>

            <p>{quantity}</p>

            <button
              onClick={increaseQuantity}
              className="hover:text-primary-red flex size-[20px] items-center justify-center rounded-full border transition-colors duration-300 hover:bg-white"
            >
              <i className="fa-solid fa-plus text-[0.9rem] leading-[20px]"></i>
            </button>
          </div>
        )}
      </div>

      <div className="lg:mt-8">
        <p className="text-rose-500">{category}</p>
        <h3 className="text-200 font-700 text-rose-900">{name}</h3>
        <p className="font-500 text-primary-red">
          {price.toLocaleString("en-us", {
            style: "currency",
            currency: "usd",
          })}
        </p>
      </div>
    </div>
  );
};

export default ProductListing;
