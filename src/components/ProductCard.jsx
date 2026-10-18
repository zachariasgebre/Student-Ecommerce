import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <Image
          src={product.image}
          alt={product.name}
          width={320}
          height={240}
          className="product-card__image"
        />
      </div>

      <div className="product-card__content">
        <p className="product-card__category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-card__price">ETB {product.price.toFixed(2)}</p>

        <p className="product-card__description">{product.description}</p>

        <div className="product-card__actions">
          <Link href={`/products/${product.id}`} className="secondary-button">
            View details
          </Link>
          {product.available ? (
            <AddToCartButton product={product} />
          ) : (
            <button type="button" className="ghost-button" disabled>
              Sold out
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
