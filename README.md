# 🛒 Globaza E-commerce

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/API-Express-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Status](https://img.shields.io/badge/Project-Active-success)

---

A **full-stack e-commerce application** to manage products, categories, cart, wishlist, and orders efficiently.

---

## 🌐 Live Demo

🔗 https://globaza-frontend.vercel.app/

---

## ⚡ Quick Start

```bash
git clone https://github.com/Tushar13Kumar/Globaza-Frontend.git
cd Globaza-Frontend
npm install
npm run dev
⚙️ Environment Setup
📁 Backend Setup
Navigate to backend project folder
git clone https://github.com/Tushar13Kumar/backend-Globaza.git
cd backend-Globaza
Install dependencies:
npm install
Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
Add dotenv in entry file:
require("dotenv").config();
Start backend server:
node index.js
🌐 Frontend Setup
Navigate to frontend folder
cd Globaza-Frontend
Install dependencies:
npm install
Start development server:
npm run dev
🔗 Connecting Frontend & Backend
Backend should run on:
http://localhost:5000
Set API base URL in frontend:
const BASE_URL = "http://localhost:5000";
🛠️ Tech Stack
Frontend
React JS
React Router
Axios
Backend
Node.js
Express.js
Database
MongoDB
Mongoose
✨ Features
🛍️ Product Management
View all products
View single product details
Add multiple products
Delete products
🗂️ Category Management
View all categories
Add categories
Get category by name or ID
🛒 Cart System
View all carts
Get cart by ID
Manage cart items
❤️ Wishlist
Add and view wishlist
Fetch wishlist by ID
📦 Order Management
Create orders
View all orders
📍 Address Management
View all user addresses
Get address by ID
🔗 API Reference
🛍️ Products
GET /products

Fetch all products

GET /products/:productId

Fetch single product

POST /products

Add multiple products

DELETE /products/:productId

Delete product

🗂️ Categories
GET /categories

Fetch all categories

GET /categories/:categoryName

Fetch category by name

GET /categories/:categoryId

Fetch category by ID

POST /categories

Add categories

📦 Orders
GET /orders

Fetch all orders

POST /orders

Create new orders

❤️ Wishlist
GET /wishlist

Fetch wishlist

GET /wishlist/:wishlistId

Fetch wishlist by ID

🛒 Cart
GET /carts

Fetch all carts

GET /carts/:cartId

Fetch cart by ID

📍 Address
GET /address

Fetch all addresses

GET /address/:addressId

Fetch address by ID

📬 Contact

📧 tusharkumar74761@gmail.com

⭐ Support

If you like this project, give it a ⭐ on GitHub!