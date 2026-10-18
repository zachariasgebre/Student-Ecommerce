import Link from "next/link";
import Image from "next/image";
import products from "@/data/products";

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Freshly roasted in Addis</p>
            <h1>Craft coffee for busy mornings and slow afternoons.</h1>
            <p className="hero-text">
              Discover Ethiopian beans, modern brew gear, and café essentials chosen for daily rituals.
            </p>
            <div className="hero-actions">
              <Link href="/products" className="primary-button">
                Browse products
              </Link>
              <Link href="/cart" className="secondary-button">
                View cart
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <Image
              src="/images/ethiopian-sunrise.svg"
              alt="Coffee beans and a grounds cup illustration"
              width={720}
              height={520}
              priority
            />
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Featured picks</p>
            <h2>Top products this week</h2>
          </div>

          <div className="product-grid compact-grid">
            {featured.map((product) => (
              <article key={product.id} className="product-card">
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
                  <div className="product-card__actions">
                    <Link href={`/products/${product.id}`} className="secondary-button">
                      View details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
