"use client";

export default function Error({ reset }) {
  return (
    <section className="container page-shell empty-state-shell">
      <h1>Something went wrong</h1>
      <p>We could not load this page. Please try again.</p>
      <button type="button" className="primary-button" onClick={() => reset()}>Try again</button>
    </section>
  );
}
