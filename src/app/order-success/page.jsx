"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

let orderSnapshot = null;

function getOrderSnapshot() {
  return orderSnapshot;
}

function getServerOrderSnapshot() {
  return null;
}

function subscribeToOrder(onStoreChange) {
  try {
    const savedOrder = window.sessionStorage.getItem("addis-coffee-last-order");
    orderSnapshot = savedOrder ? JSON.parse(savedOrder) : null;
  } catch {
    orderSnapshot = null;
  }
  onStoreChange();
  return () => {};
}

export default function OrderSuccessPage() {
  const order = useSyncExternalStore(subscribeToOrder, getOrderSnapshot, getServerOrderSnapshot);

  return (
    <section className="container page-shell success-shell">
      <div className="success-card">
        <p className="eyebrow">Order received</p>
        <h1>Thank you for shopping with Addis Coffee &amp; Brew.</h1>
        {order ? (
          <>
            <p>Your order reference is <strong>{order.id}</strong>.</p>
            <p>We will contact {order.customer.name} at {order.customer.contact} to arrange delivery.</p>
            <h2>Order summary</h2>
            <ul className="order-lines">
              {order.items.map((item) => (
                <li key={item.id}>
                  <span>{item.name} × {item.quantity}</span>
                  <strong>ETB {(item.price * item.quantity).toFixed(2)}</strong>
                </li>
              ))}
            </ul>
            <p><strong>Total: ETB {Number(order.total).toFixed(2)}</strong></p>
            <p>Delivery address: {order.customer.address}</p>
          </>
        ) : (
          <p>No recent order is available in this browser session. You can still browse the catalogue and submit an order.</p>
        )}
        <Link href="/products" className="primary-button">Continue shopping</Link>
      </div>
    </section>
  );
}
