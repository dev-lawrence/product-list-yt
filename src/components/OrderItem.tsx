import { ProductItem } from "../libs/types";

interface OrderItemProps {
  product: ProductItem;
}

const OrderItem = ({ product }: OrderItemProps) => {
  const totalPricePerProduct = product.price * product.quantity!;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          className="size-[40px] rounded-lg object-cover"
          src={product.image}
          alt={product.name}
        />

        <div>
          <h4 className="font-500">{product.name}</h4>

          <div className="flex items-center gap-4">
            <span className="font-500 text-primary-red">
              {product.quantity}x
            </span>

            <div className="flex gap-2">
              <p className="text-rose-400">
                @
                {product.price.toLocaleString("en-us", {
                  style: "currency",
                  currency: "usd",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="font-500 text-rose-400">
        {totalPricePerProduct.toLocaleString("en-us", {
          style: "currency",
          currency: "usd",
        })}
      </p>
    </div>
  );
};

export default OrderItem;
