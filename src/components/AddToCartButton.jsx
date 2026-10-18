"use client";

import { useCart } from "@/components/CartProvider";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  return (
    <button type="button" onClick={() => addToCart(product)} className="primary-button">
      Add to cart
    </button>
  );
}
