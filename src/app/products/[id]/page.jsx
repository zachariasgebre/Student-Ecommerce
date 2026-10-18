import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import products from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = products.find((entry) => entry.id === id);

  if (!product) {
    notFound();
  }

  return (
    <section className="container page-shell product-detail-page">
      <Link href="/products" className="back-link">
        ← Back to products
      </Link>

      <div className="product-detail">
        <div className="product-detail__image-wrap">
          <Image
            src={product.image}
            alt={product.name}
            width={760}
            height={520}
            priority
          />
        </div>

        <div className="product-detail__content">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-detail__price">ETB {product.price.toFixed(2)}</p>
          <p className="product-detail__meta">
            {product.available ? "In stock" : "Currently unavailable"}
          </p>
          <p className="product-detail__description">{product.description}</p>

          {product.available ? (
            <AddToCartButton product={product} />
          ) : (
            <button type="button" className="ghost-button" disabled>
              Sold out
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
