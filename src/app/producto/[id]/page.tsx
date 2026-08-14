import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductById, getProducts } from "@/lib/products";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const gallery = product.gallery ?? [product.image];

  return (
    <>
      <Header />
      <main className="max-w-[1440px] mx-auto px-5 md:px-20 py-30 pt-32 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Image gallery */}
        <div className="md:col-span-7 flex flex-col gap-2">
          <div className="aspect-[4/5] bg-surface-container-low w-full relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="absolute inset-0 w-full h-full object-cover"
              alt={product.name}
              src={gallery[0]}
            />
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-2 gap-2">
              {gallery.slice(1).map((src, i) => (
                <div key={i} className="aspect-square bg-surface-container-low w-full relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="absolute inset-0 w-full h-full object-cover"
                    alt={`${product.name} - vista ${i + 2}`}
                    src={src}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="md:col-span-5 flex flex-col pt-8 md:pt-0 md:sticky md:top-28 h-fit">
          <h1 className="font-display text-headline-md text-primary mb-4">{product.name}</h1>
          <p className="font-body text-body-lg text-on-surface-variant mb-8">
            ${product.price.toLocaleString("es-MX")}
          </p>
          {product.description && (
            <div className="mb-12">
              <p className="font-body text-body-md text-on-surface mb-6 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
          {product.specs && (
            <div className="flex flex-col gap-4 mb-12">
              {Object.entries(product.specs).map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-surface-variant pb-2">
                  <span className="font-body text-label-caps text-on-surface-variant uppercase">
                    {label}
                  </span>
                  <span className="font-body text-body-md text-primary">{value}</span>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-4 mt-auto">
            <AddToCartButton
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
            <button className="w-full bg-surface-container-lowest text-primary border border-outline-variant font-body text-button uppercase py-4 hover:bg-surface-container-low transition-colors duration-300">
              Agendar Consulta
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
