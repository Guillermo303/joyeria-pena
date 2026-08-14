"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart-context";

export default function CarritoPage() {
  const { items, removeItem, setQuantity, totalPrice, clear } = useCart();
  const [sent, setSent] = useState(false);

  return (
    <>
      <Header />
      <main className="flex-grow pt-32 pb-30 px-5 md:px-20 max-w-[1440px] mx-auto w-full">
        <h1 className="font-display text-display-lg text-tertiary mb-12">Mi Bolsa</h1>

        {items.length === 0 && !sent && (
          <div className="text-center py-24 border border-outline-variant bg-surface-container-lowest">
            <p className="font-body text-body-lg text-on-surface-variant mb-8">
              Tu bolsa está vacía.
            </p>
            <Link
              href="/colecciones"
              className="inline-flex items-center justify-center px-10 py-4 bg-tertiary text-on-primary font-body text-button uppercase tracking-widest hover:bg-primary transition-all duration-300"
            >
              Ver Colecciones
            </Link>
          </div>
        )}

        {sent && (
          <div className="text-center py-24 border border-outline-variant bg-surface-container-lowest">
            <span className="material-symbols-outlined text-[48px] text-secondary mb-6 font-light block">
              check_circle
            </span>
            <h2 className="font-display text-headline-sm text-tertiary mb-4">
              ¡Pedido recibido!
            </h2>
            <p className="font-body text-body-md text-on-surface-variant mb-8 max-w-md mx-auto">
              Nos pondremos en contacto contigo para confirmar disponibilidad, forma de pago y
              entrega de tus piezas.
            </p>
            <Link
              href="/colecciones"
              className="inline-flex items-center justify-center px-10 py-4 bg-tertiary text-on-primary font-body text-button uppercase tracking-widest hover:bg-primary transition-all duration-300"
            >
              Seguir Viendo Colecciones
            </Link>
          </div>
        )}

        {items.length > 0 && !sent && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-6 border border-outline-variant bg-surface-container-lowest p-6"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 aspect-square object-cover bg-surface-container"
                  />
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <Link
                        href={`/producto/${item.id}`}
                        className="font-body text-body-lg text-tertiary hover:text-secondary transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="font-body text-body-md text-on-surface-variant mt-1">
                        ${item.price.toLocaleString("es-MX")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-outline-variant">
                        <button
                          aria-label="Disminuir cantidad"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center text-tertiary hover:bg-surface-container-low transition-colors"
                        >
                          −
                        </button>
                        <span className="w-10 text-center font-body text-body-md text-tertiary">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Aumentar cantidad"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-tertiary hover:bg-surface-container-low transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        aria-label="Quitar de la bolsa"
                        onClick={() => removeItem(item.id)}
                        className="text-on-surface-variant hover:text-error transition-colors"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={clear}
                className="self-start font-body text-label-caps text-on-surface-variant hover:text-error transition-colors uppercase tracking-widest mt-2"
              >
                Vaciar bolsa
              </button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-4">
              <div className="border border-outline-variant bg-surface-container-lowest p-8 lg:sticky lg:top-28">
                <h2 className="font-display text-headline-sm text-tertiary mb-6">Resumen</h2>
                <div className="flex justify-between border-b border-surface-variant pb-4 mb-4">
                  <span className="font-body text-body-md text-on-surface-variant">Subtotal</span>
                  <span className="font-body text-body-md text-tertiary">
                    ${totalPrice.toLocaleString("es-MX")}
                  </span>
                </div>
                <p className="font-body text-body-md text-on-surface-variant/70 text-sm mb-8">
                  El envío y forma de pago se confirman al contactarte.
                </p>
                <button
                  onClick={() => {
                    setSent(true);
                    clear();
                  }}
                  className="w-full bg-tertiary text-on-tertiary font-body text-button uppercase py-4 hover:bg-primary transition-colors duration-300"
                >
                  Enviar Pedido
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
