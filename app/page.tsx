import GridView from "./components/GridView";
import RootLayout from "./layout";

export default function HomePage() {
  return (
    <div className="mt-8">
    <h1 className="text-2xl font-bold mb-4">Bienvenido a Mi Tienda Online</h1>
    <p className="text-lg mb-4">Descubre nuestros productos destacados:</p>
    <GridView /> {/* Renderiza el componente GridView aquí */}
  </div>
  );
}