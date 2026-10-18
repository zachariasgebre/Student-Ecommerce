"use client";

import { useMemo, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import products from "@/data/products";

const categories = ["All", ...new Set(products.map((product) => product.category))];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const visibleProducts = useMemo(() => {
    const filtered =
      selectedCategory === "All"
        ? [...products]
        : products.filter((product) => product.category === selectedCategory);

    if (sortBy === "low-to-high") {
      return filtered.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high-to-low") {
      return filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  return (
    <section className="container page-shell">
      <div className="section-heading catalog-header">
        <div>
          <p className="eyebrow">Shop all</p>
          <h1>Our products</h1>
        </div>

        <div className="catalog-controls">
          <label>
            <span>Filter by category</span>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Sort by</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </label>
        </div>
      </div>

      <ProductGrid products={visibleProducts} />
    </section>
  );
}
