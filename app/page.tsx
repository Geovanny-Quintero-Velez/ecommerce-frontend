import Navbar from "../components/general/navbar/Navbar";
import ProductCarousel from "../components/home/ProductsCarousel";
import { useFetchProducts } from "../hooks/product/useFetchProducts";

export default async function HomePage() {
  const { fetchProducts } = useFetchProducts();
  const products = await fetchProducts();

  if (!products) return <p>Products couldn't be loaded correctly</p>

  return (
    <section>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Bienvenido a Mi Tienda Online</h1>
        <p className="text-lg mb-4">Descubre nuestros productos destacados:</p>
        <ProductCarousel products={products}/>
        <ProductCarousel products={products}/>
      </div>
    </section>
  );
}
