"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import products from "@/data/products";

export default function CartPage() {
  const { items, subtotal, increaseQuantity, decreaseQuantity, removeItem } = useCart();

  const cartItems = items
    .map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  if (cartItems.length === 0) {
    return (
      <section className="container page-shell empty-state-shell">
        <h1>Your cart is empty</h1>
        <p>Browse our coffee beans and brewing essentials to start your order.</p>
        <Link href="/products" className="primary-button">
          Shop products
        </Link>
      </section>
    );
  }

  return (
    <section className="container page-shell cart-shell">
      <div className="section-heading cart-header">
        <div>
          <p className="eyebrow">Your basket</p>
          <h1>Cart summary</h1>
        </div>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <article key={item.id} className="cart-item">
              <div className="cart-item__image-wrap">
                <Image src={item.image} alt={item.name} width={160} height={120} />
              </div>

              <div className="cart-item__details">
                <div>
                  <h2>{item.name}</h2>
                  <p>{item.category}</p>
                </div>

                <div className="cart-item__price-row">
                  <span>ETB {item.price.toFixed(2)}</span>
                  <div className="quantity-controls" aria-label={`Update quantity for ${item.name}`}>
                    <button type="button" onClick={() => decreaseQuantity(item.id)} aria-label={`Decrease quantity of ${item.name}`}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => increaseQuantity(item.id)} aria-label={`Increase quantity of ${item.name}`}>
                      +
                    </button>
                  </div>
                  <strong>ETB {(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              </div>

              <button type="button" className="text-button" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </article>
          ))}
        </div>

        <aside className="cart-summary" aria-label="Cart summary">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>ETB {subtotal.toFixed(2)}</strong>
          </div>
          <Link href="/checkout" className="primary-button full-width">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}
