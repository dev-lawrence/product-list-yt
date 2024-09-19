import { createContext, ReactNode } from "react";
import { CartContextProps, ProductItem } from "./libs/types";
import { useLocalStorage } from "./useLocalStorage";

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
  const [products, setProduct] = useLocalStorage<ProductItem[]>(
    "dessert-product",
    [],
  );

  //  Function to add products
  const addToCart = (
    id: number,
    name: string,
    price: number,
    image: string,
  ) => {
    const existingProduct = products.find((product) => product.id === id);

    if (existingProduct) {
      const updateProduct = products.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity! + 1 };
        }

        return product;
      });

      setProduct(updateProduct);
    } else {
      setProduct((prevProduct) => [
        ...prevProduct,
        { id, name, price, image, quantity: 1 },
      ]);
    }
  };

  // Function to reduce the quantity of product in the cart
  const reduceCartQuantity = (id: number) => {
    const updateProduct = products.map((product) => {
      if (product.id === id) {
        const updateQuantity = product.quantity! - 1;

        if (updateQuantity < 1) {
          removeFromCart(id);
        }

        return { ...product, quantity: updateQuantity };
      }

      return product;
    });

    setProduct(updateProduct);
  };

  //   Function to remove product from cart
  const removeFromCart = (id: number) => {
    setProduct((prevProduct) =>
      prevProduct.filter((product) => product.id !== id),
    );
  };

  //   Function to check if a product is in the cart
  const isItemInCart = (id: number) => {
    return products.some((product) => product.id === id);
  };

  //   function to reset the cart
  const resetCart = () => {
    setProduct([]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addToCart,
        reduceCartQuantity,
        removeFromCart,
        isItemInCart,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
