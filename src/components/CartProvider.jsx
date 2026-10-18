"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import products from "@/data/products";

const STORAGE_KEY = "addis-coffee-cart";
const CartContext = createContext(null);
const serverSnapshot = { items: [], hydrated: false };
let snapshot = serverSnapshot;
const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener());
}

function readSavedItems() {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(value)) return [];
    return value.filter((item) =>
      products.some((product) => product.id === item.id) &&
      Number.isInteger(item.quantity) && item.quantity > 0,
    );
  } catch {
    return [];
  }
}

function subscribe(listener) {
  listeners.add(listener);
  if (!snapshot.hydrated) {
    snapshot = { items: readSavedItems(), hydrated: true };
    notify();
  }
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return serverSnapshot;
}

function updateItems(update) {
  const items = typeof update === "function" ? update(snapshot.items) : update;
  snapshot = { items, hydrated: true };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Keep cart interactions usable when browser storage is unavailable.
  }
  notify();
}

export function CartProvider({ children }) {
  const { items, hydrated } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addToCart = useCallback((product) => {
    if (!product.available) return;
    updateItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { id: product.id, quantity: 1 }];
    });
  }, []);

  const increaseQuantity = useCallback((id) => {
    updateItems((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  }, []);

  const decreaseQuantity = useCallback((id) => {
    updateItems((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0));
  }, []);

  const removeItem = useCallback((id) => updateItems((current) => current.filter((item) => item.id !== id)), []);
  const clearCart = useCallback(() => updateItems([]), []);
  const subtotal = items.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(() => ({ items, itemCount, subtotal, addToCart, increaseQuantity, decreaseQuantity, removeItem, clearCart, hydrated }), [items, itemCount, subtotal, addToCart, increaseQuantity, decreaseQuantity, removeItem, clearCart, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
