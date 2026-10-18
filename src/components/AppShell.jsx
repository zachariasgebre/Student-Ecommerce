"use client";

import { CartProvider } from "@/components/CartProvider";
import SiteHeader from "@/components/SiteHeader";

export default function AppShell({ children }) {
  return (
    <CartProvider>
      <SiteHeader />
      <main>{children}</main>
    </CartProvider>
  );
}
