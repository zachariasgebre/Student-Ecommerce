"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function SiteHeader() {
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" aria-label="Addis Coffee home page">
          Addis Coffee & Brew
        </Link>

        <nav aria-label="Main navigation" className="main-nav">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart" aria-label={`Shopping cart with ${itemCount} items`}>
            Cart {itemCount > 0 ? `(${itemCount})` : ""}
          </Link>
        </nav>
      </div>
    </header>
  );
}
