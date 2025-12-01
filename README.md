E-Commerce React App

A simple, responsive e-commerce web app built with React and Bootstrap.
Features: product listing, filters (category, rating), sort by price, product details, wishlist, cart, address management, checkout, user profile, search, loading states and alerts.

🔖 Table of Contents

Project Overview

Live Demo (Optional)

Features

Tech Stack

API Routes (Backend contract)

App Pages / User Stories

Getting Started (Local Setup)

Folder Structure

Important Components & Contexts

Deploying to GitHub Pages (technical steps)

Future Improvements

Contributing

License & Contact

Project Overview

This project is a modular e-commerce frontend built using React (functional components + hooks) and Bootstrap for styling. The app demonstrates a typical e-commerce flow: browse categories → filter & sort → view product → add to wishlist/cart → checkout using saved addresses → view order history.

You can use any dataset (JSON or a simple backend) to feed products & categories. Backend endpoints (GET routes) are documented below — the frontend expects these.

Live Demo (Optional)

If hosted, add the URL here (e.g. https://your-username.github.io/your-repo).

Features

Home page with featured categories

Product Listing with:

Category filters (checkboxes)

Ratings filter (slider)

Clear filters button

Sort by price (low → high / high → low)

Search (from header)

Product Card with image, name, price, rating, Add to Cart, Add to Wishlist

Product Details page with full information and actions

Wishlist page: view, remove, move to cart

Cart page: view items, increment/decrement quantity, remove, move to wishlist, price summary, checkout

Address management: add, edit, delete, select shipping address

Checkout: choose address → place order → "Order Placed Successfully" and save order history

User Profile: static user info, add address, view order history

Loading indicators and alert messages for actions

Search from navbar

Responsive using Bootstrap

Tech Stack

Frontend

React (v18+)

React Router DOM

Bootstrap 5 (CSS + utility classes)

Optional: Context API / useReducer for global state (Cart, Wishlist, Auth, Alerts)

Backend (simple expected API)

Any REST server (Express, json-server, Firebase, etc.)

GET routes for products & categories (details below)

Dev tools

npm / yarn

gh-pages (optional, for GitHub Pages deployment)

API Routes (Backend contract)

The frontend expects these GET endpoints. You may implement them with json-server or a real backend.

Products

Get all products
GET /api/products
Response body:

{
  "data": {
    "products": [ /* Array of product objects */ ]
  }
}


Get product by id
GET /api/products/:productId
Response body:

{
  "data": {
    "product": { /* product object */ }
  }
}


Categories

Get all categories
GET /api/categories
Response:

{
  "data": {
    "categories": [ /* Array of category objects */ ]
  }
}


Get category by id
GET /api/categories/:categoryId
Response:

{
  "data": {
    "category": { /* category object */ }
  }
}


Notes on product object (recommended fields)

{
  "id": "string|number",
  "name": "string",
  "description": "string",
  "price": 0,
  "discountPrice": 0,
  "category": "string",
  "image": "url",
  "rating": 4.5,
  "stock": 10
}

App Pages / User Stories

Home: Featured categories; click category → Product Listing with that category applied.

Product Listing: Show all products; left sidebar filters: categories (checkboxes), rating slider, clear filters; sort by price radio buttons; search/filter/sort combine.

Product Detail: Full product info + Add to Cart / Add to Wishlist.

Wishlist: See liked products; remove or move to cart.

Cart: Modify quantity (+ / −), remove item, move to wishlist, view price details card with Checkout button.

Address Management: Add / Edit / Delete addresses; select a delivery address in checkout.

Checkout: Confirm address → place order → order saved (backend) and "Order Placed Successfully" shown.

Profile: Static user info, address management link, order history list.

Alerts & Loading: Toast/alert for actions and spinners during data fetch.

Getting Started (Local Setup)
Prerequisites

Node.js and npm (or yarn)

Install
# clone
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# install
npm install
# or
yarn

Environment

Create .env (if needed) to hold API base URL:

REACT_APP_API_BASE_URL=http://localhost:5000/api

Run (dev)
npm start
# or
yarn start


Open http://localhost:3000

Build (prod)
npm run build
# or
yarn build

Folder Structure (suggested)
/src
  /api              # API helper functions (fetch wrapper)
  /components
    Header.jsx
    Footer.jsx
    ProductCard.jsx
    Filters.jsx
    RatingSlider.jsx
    ...
  /pages
    Home.jsx
    ProductListing.jsx
    ProductDetail.jsx
    Cart.jsx
    Wishlist.jsx
    Profile.jsx
    Checkout.jsx
  /context          # CartContext, WishlistContext, AuthContext, AlertContext
  /utils            # helpers (price calc, filter logic)
  /data             # mock data (optional)
  index.js
  App.jsx

Important Components & Contexts

CartContext — holds cart items, quantities, total; methods: addToCart, removeFromCart, incrementQty, decrementQty, moveToWishlist.

WishlistContext — holds wishlist items; methods: addToWishlist, removeFromWishlist, moveToCart.

AddressContext — manage addresses; select address for checkout.

AlertContext — global alerts (success/error) shown on actions.

useFetch / api.js — wrapper around fetch / axios to get /api/products and /api/products/:id and categories.

Alerts & Loading

Use Bootstrap Toasts or alert components for user feedback.

Use a spinner (Bootstrap) while fetching products or product detail.

Show confirmations for add/remove/move actions.

Deploying to GitHub Pages — Technical Steps

To host the React app on GitHub Pages:

In package.json add:

"homepage": "https://<your-username>.github.io/<your-repo>"


Install gh-pages:

npm install --save-dev gh-pages
# or
yarn add --dev gh-pages


Add scripts to package.json:

"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  "start": "react-scripts start",
  "build": "react-scripts build"
}


Use HashRouter in your app instead of BrowserRouter (or set up 404 redirect) to avoid routing issues on GitHub Pages. Example:

import { HashRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* routes */}
    </Router>
  );
}


Commit & push, then run:

npm run deploy
# or
yarn deploy


After deploy, go to your repository on GitHub → Settings → Pages (or GitHub Pages) and ensure the branch gh-pages is selected (this is automatic for gh-pages deploy). The site will be available at the homepage URL you set.

Notes & tips

If you want pretty URLs (no #), you'll need to host on Netlify / Vercel or configure redirects on GitHub Pages (more complex).

For a backend API, host it separately (Heroku, Railway, Render, or any server). Make sure REACT_APP_API_BASE_URL is set to the public backend URL.

Example README Sections to Copy to GitHub (Short Tech Summary)

Paste this somewhere near the top of your GitHub README as a short project descriptor:

E-Commerce React App — A responsive single-page e-commerce UI built with React and Bootstrap. Supports product listing, filtering, sorting, wishlist & cart management, addresses, checkout and order history. Backend contract includes GET /api/products, GET /api/products/:productId, GET /api/categories and GET /api/categories/:categoryId. Deployable to GitHub Pages (use HashRouter) or modern hosting services.

Future Improvements

Add user authentication (signup/login) and per-user data persistence

Payment gateway integration (Stripe / Razorpay)

Product reviews & comments

Pagination & server-side filtering

Image upload for products (admin UI)

Better accessibility & unit tests

Contributing

Fork the repo

Create a branch: git checkout -b feature/your-feature

Commit changes: git commit -m "feat: add ..."

Push: git push origin feature/your-feature

Open a Pull Request

Please follow the code style used in the project and keep changes focused.

License & Contact

License: MIT (or pick one)

Author: <Your Name> — add email or GitHub handle

Quick copy-paste checklist for README top (short)

You can paste this at the very top of README for a concise header:

# E-Commerce React App
A responsive e-commerce single-page application built with React and Bootstrap. Features product listing, fi
