import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container page-shell not-found-shell">
      <h1>Page not found</h1>
      <p>We could not find the page or product you requested.</p>
      <Link href="/products" className="primary-button">
        Continue shopping
      </Link>
    </section>
  );
}
