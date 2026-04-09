# React E-Commerce Project

A full-stack e-commerce web application built with React and Node.js, featuring product browsing, shopping cart management, checkout flow, order history, and order tracking.

## Tech Stack

**Frontend**
- React 19
- React Router 7
- Axios
- Day.js
- Vite

**Backend**
- Node.js
- Express
- Sequelize ORM
- SQLite (via sql.js)

**Testing**
- Vitest
- React Testing Library
- @testing-library/user-event

## Features

- **Product Listing** — Browse products with real-time search
- **Shopping Cart** — Add items, update quantities, delete items
- **Checkout** — Select delivery options (standard / expedited / overnight) with live price updates
- **Payment Summary** — Itemized breakdown including shipping and tax
- **Order History** — View all past orders with product details
- **Order Tracking** — Visual progress bar showing preparing / shipped / delivered status

## Project Structure

```
react-ecommerce-project/
├── ecommerce-project-js/       # React frontend
│   ├── src/
│   │   ├── components/         # Shared components (Header)
│   │   ├── pages/
│   │   │   ├── home/           # Product listing page
│   │   │   ├── checkout/       # Checkout page & components
│   │   │   ├── orders/         # Order history page
│   │   │   └── TrackingPage    # Order tracking page
│   │   └── utils/              # Utility functions (money formatting)
│   ├── vite.config.js
│   └── vitest.config.js
│
└── ecommerce-backend/          # Node.js/Express backend
    ├── models/                 # Sequelize models (Product, CartItem, Order, DeliveryOption)
    ├── routes/                 # API route handlers
    └── defaultData/            # Seed data for first-time setup
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation & Running Locally

The project has two separate packages. You need to start both.

**1. Start the backend**

```bash
cd ecommerce-backend
npm install
npm run dev
```

The backend runs on `http://localhost:3000`. The SQLite database is created automatically on first run and seeded with default products, cart items, and orders.

**2. Start the frontend** (in a new terminal)

```bash
cd ecommerce-project-js
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

> The Vite dev server proxies `/api` and `/images` requests to the backend automatically — no extra configuration needed.

## Running Tests

```bash
cd ecommerce-project-js
npm test
```

Tests are written with Vitest and React Testing Library. Covered components:

| Component | What is tested |
|---|---|
| `Product` | Renders product details, adds to cart, quantity selection |
| `DeliveryOptions` | Renders options, updates selection on click |
| `CheckoutPage` | Full page render, API calls, payment summary display |
| `PaymentSummary` | Displays cost breakdown correctly |
| `Header` | Renders navigation, search functionality |
| `HomePage` | Renders product grid |

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products (supports `?search=`) |
| GET | `/api/cart-items` | Get cart items (supports `?expand=product`) |
| POST | `/api/cart-items` | Add item to cart |
| PUT | `/api/cart-items/:productId` | Update quantity or delivery option |
| DELETE | `/api/cart-items/:productId` | Remove item from cart |
| GET | `/api/delivery-options` | Get delivery options |
| GET | `/api/payment-summary` | Get calculated payment summary |
| GET | `/api/orders` | Get all orders (supports `?expand=products`) |
| POST | `/api/orders` | Place order from current cart |
| GET | `/api/orders/:orderId` | Get single order |
| POST | `/api/reset` | Reset database to default data |

## Building for Production

```bash
cd ecommerce-project-js
npm run build
```

This builds the React app and outputs the result to `ecommerce-backend/dist/`. The Express server then serves it as static files, so only the backend needs to run in production.
