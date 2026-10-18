# Addis Coffee & Brew

A responsive student ecommerce demo for browsing Ethiopian coffee and brewing essentials, managing a cart, and submitting a delivery order request. The project has no payment processing, account system, database, or external service integration. Cart and most recent order data are stored in the current browser.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `npm run lint` for linting, `npm run build` to create the production build, and `npm run start` to serve that build.

## Features

- Ten products defined in `src/data/products.js`, with local SVG illustrations in `public/images`.
- Home page with featured products and a catalogue with category filtering and price sorting.
- Product detail pages with availability and add-to-cart controls.
- Cart quantities, removal, and subtotal calculated from shared product prices.
- Required customer contact and delivery fields, validation, and an order confirmation summary.
- Responsive layout and keyboard focus styles.

The order flow is a demo only. It stores the cart and latest submitted order in browser storage; it does not transmit an order to a seller.

## Project structure

```text
src/app/         App Router pages, layouts, and error states
src/components/  Shared product, navigation, and cart components
src/data/        Canonical product catalogue
public/images/   Local product illustrations
```

No environment variables are currently required.
