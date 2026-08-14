"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function AddToCartButton({
  id,
  name,
  price,
  image,
}: {
  id: string;
  name: string;
  price: number;
  image: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem({ id, name, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-primary text-on-primary font-body text-button uppercase py-4 hover:bg-tertiary-container transition-colors duration-300"
    >
      {added ? "Añadido ✓" : "Añadir a la Bolsa"}
    </button>
  );
}
