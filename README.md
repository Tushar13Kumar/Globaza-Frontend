📦 E-Commerce Web Application (React + Bootstrap)

A fully-featured, modular E-Commerce Web Application built using React JS and Bootstrap, implementing core marketplace functionalities such as product listing, filters, sorting, wishlist, cart, checkout, address management, user profile, alerts, and search.
This project is designed as a foundational major project to understand scalable front-end architecture, global state management, and API integration.

🚀 1. Project Overview

This application simulates a real-world e-commerce flow that allows users to browse categories, explore products, manage their wishlist/cart, choose delivery addresses, and place orders. The frontend interacts with a defined backend contract (GET APIs for products and categories).

The project focuses on:

Clean and modular component-based architecture

Reusable UI components

State management via React Context

Clear separation of API, UI, and business logic

Real-time UX: alerts, loaders, dynamic filters and search

🧩 2. Key Features
🏠 Home Page

Displays featured categories.

Clicking a category redirects to the product listing filtered by that category.

🛍️ Product Listing Page

Product cards with image, name, price, rating, Add to Cart, Add to Wishlist.

Includes multiple filters:

Category Filter (checkbox-based)

Rating Filter (range slider)

Clear Filters button

Sort by Price (Low → High, High → Low)

Fully integrated search bar in navbar.

📄 Product Details Page

Clicking a product opens a details page with full information.

Buttons: Add to Cart, Add to Wishlist.

❤️ Wishlist Management

View all wishlist items.

Remove item or Move to Cart.

If item exists in cart, quantity increases.

🛒 Cart Management

Increase / decrease quantity.

Remove item or move to wishlist.

Cart price details card with Checkout button.

📮 Address Management

Add, update, delete, and select delivery addresses.

✅ Checkout

Select address → order summary → Order Placed Successfully.

Order saved in backend.

👤 User Profile

Shows static user data.

Options:

Add Address

View Order History

⚡ Loading & Alerts

Global loading indicators.

Alerts for:

Add/remove cart

Add/remove wishlist

Move between lists

Increase/decrease quantity

🔌 3. Backend API Contract
Products
GET all products
GET /api/products


Response:

{
  "data": {
    "products": []
  }
}

GET single product
GET /api/products/:productId


Response:

{
  "data": {
    "product": {}
  }
}

Categories
GET all categories
GET /api/categories


Response:

{
  "data": {
    "categories": []
  }
}

GET category by ID
GET /api/categories/:categoryId


Response:

{
  "data": {
    "category": {}
  }
}

🏗️ 4. Technologies Used

React JS (Functional Components + Hooks)

React Router DOM

Bootstrap 5

Context API (Cart, Wishlist, Address, Alerts, Search)

REST API Integration

gh-pages (optional for deployment)

📁 5. Suggested Folder Structure
src/
│── api/
│── components/
│── context/
│── pages/
│── utils/
│── App.jsx
│── index.js

🛠️ 6. Installation & Setup
Clone the repository
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>

Install dependencies
npm install

Start development server
npm start

Build for production
npm run build

🌐 7. Deployment (GitHub Pages)
Install gh-pages
npm install --save-dev gh-pages

Add to package.json
"homepage": "https://<username>.github.io/<repo-name>"

Deployment scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

Deploy command
npm run deploy

🧭 8. Future Enhancements

JWT-based user authentication (login/signup)

Add product reviews & ratings

Admin panel for product management

Server-side pagination & filtering

Payment gateway integration (Stripe/Razorpay)

📜 9. License

This project is open-source and available under the MIT License.

👨‍💻 10. Author

Tushar Kumar
 
