import CartList from "./components/CartList";
import ProductListing from "./components/ProductListing";
import { products } from "./data";

const Home = () => {
  return (
    <section className="mb-8 pt-8 lg:mb-0">
      <div className="container lg:grid lg:grid-cols-[2.5fr_1fr] lg:gap-4">
        <div>
          <div className="mb-6">
            <h1 className="text-500 font-700">Desserts</h1>
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {products.map((product) => (
              <ProductListing key={product.id} product={product} />
            ))}
          </div>
        </div>

        <CartList />
      </div>
    </section>
  );
};

export default Home;
