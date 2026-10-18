"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import products from "@/data/products";

const initialState = {
  name: "",
  contact: "",
  address: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const cartItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((entry) => entry.id === item.id);
          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean),
    [items],
  );

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Please enter your full name.";
    if (!formData.contact.trim()) nextErrors.contact = "Please enter your phone or email.";
    if (!formData.address.trim()) nextErrors.address = "Please enter a delivery address.";

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      router.push("/cart");
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      customer: {
        name: formData.name.trim(),
        contact: formData.contact.trim(),
        address: formData.address.trim(),
      },
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: subtotal,
    };

    window.sessionStorage.setItem("addis-coffee-last-order", JSON.stringify(order));
    clearCart();
    router.push("/order-success");
  };

  if (cartItems.length === 0) {
    return (
      <section className="container page-shell empty-state-shell">
        <h1>Your cart is empty</h1>
        <p>Add items before checking out.</p>
        <Link href="/products" className="primary-button">
          Browse products
        </Link>
      </section>
    );
  }

  return (
    <section className="container page-shell checkout-shell">
      <div className="section-heading">
        <p className="eyebrow">Checkout</p>
        <h1>Complete your order</h1>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Full name</span>
            <input
              type="text"
              id="customer-name"
              name="name"
              autoComplete="name"
              required
              value={formData.name}
              onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <small id="name-error">{errors.name}</small>}
          </label>

          <label>
            <span>Contact</span>
            <input
              type="text"
              id="customer-contact"
              name="contact"
              autoComplete="email"
              required
              value={formData.contact}
              onChange={(event) => setFormData((current) => ({ ...current, contact: event.target.value }))}
              aria-invalid={Boolean(errors.contact)}
              aria-describedby={errors.contact ? "contact-error" : undefined}
            />
            {errors.contact && <small id="contact-error">{errors.contact}</small>}
          </label>

          <label>
            <span>Delivery address</span>
            <textarea
              value={formData.address}
              id="delivery-address"
              name="address"
              autoComplete="street-address"
              required
              onChange={(event) => setFormData((current) => ({ ...current, address: event.target.value }))}
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? "address-error" : undefined}
            />
            {errors.address && <small id="address-error">{errors.address}</small>}
          </label>

          <button type="submit" className="primary-button full-width">
            Submit order
          </button>
        </form>

        <aside className="cart-summary" aria-label="Checkout order summary">
          <h2>Order summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="summary-row">
              <span>
                {item.name} × {item.quantity}
              </span>
              <strong>ETB {(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
          <div className="summary-row total-row">
            <span>Total</span>
            <strong>ETB {subtotal.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}
