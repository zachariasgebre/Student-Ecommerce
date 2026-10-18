"use client";

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body>
        <main className="container page-shell empty-state-shell">
          <h1>Something went wrong</h1>
          <p>Please try loading the store again.</p>
          <button type="button" className="primary-button" onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
