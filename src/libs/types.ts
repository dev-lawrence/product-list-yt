export interface ProductItem {
  id: number;
  name: string;
  category?: string;
  price: number;
  image: string;
  quantity?: number;
}

export interface CartContextProps {
  products: ProductItem[];
  addToCart: (id: number, name: string, price: number, image: string) => void;
  reduceCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  isItemInCart: (id: number) => boolean;
  resetCart: () => void;
}
