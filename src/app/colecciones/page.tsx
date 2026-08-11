import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Joyería Peña - Catálogo",
};

export default async function ColeccionesPage() {
  const products = await getProducts();

  return (
    <>
      <Header />
      <main className="flex-grow pt-[120px] pb-30 px-5 md:px-20 max-w-[1440px] mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="font-display text-headline-md mb-4 text-tertiary">Colecciones</h2>
          <p className="font-body text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Descubre nuestra selección curada de joyería fina, donde la elegancia atemporal se
            encuentra con la artesanía moderna.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="px-6 py-3 border border-outline text-tertiary font-body text-button uppercase hover:bg-surface-variant transition-colors bg-surface-container-lowest">
            Categorías
          </button>
          <button className="px-6 py-3 border border-outline text-tertiary font-body text-button uppercase hover:bg-surface-variant transition-colors bg-surface-container-lowest">
            Material
          </button>
          <button className="px-6 py-3 border border-outline text-tertiary font-body text-button uppercase hover:bg-surface-variant transition-colors bg-surface-container-lowest">
            Precio
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/producto/${product.id}`}
              className={`group relative cursor-pointer border border-surface-variant bg-surface-container-lowest hover:border-secondary transition-colors duration-300 flex flex-col p-8 ${
                product.wide ? "lg:col-span-2" : ""
              }`}
            >
              <div
                className={`w-full mb-6 overflow-hidden bg-surface-container flex items-center justify-center ${
                  product.wide ? "aspect-[2/1]" : "aspect-square"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  alt={product.name}
                  src={product.image}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="font-body text-label-caps text-on-surface-variant mb-2 uppercase">
                  {product.category}
                </span>
                <h3 className="font-body text-body-lg text-tertiary mb-3">{product.name}</h3>
                <p className="font-display text-headline-sm text-tertiary">
                  ${product.price.toLocaleString("es-MX")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
