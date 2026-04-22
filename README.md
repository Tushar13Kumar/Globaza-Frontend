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
```

---

## ⚙️ Environment Setup

### 📁 Backend Setup

1. Clone backend project

```bash
git clone https://github.com/Tushar13Kumar/backend-Globaza.git
cd backend-Globaza
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

4. Add dotenv:

```js
require("dotenv").config();
```

5. Run backend:

```bash
node index.js
```

---

### 🌐 Frontend Setup

1. Go to frontend folder

```bash
cd Globaza-Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run project:

```bash
npm run dev
```

---

### 🔗 Connecting Frontend & Backend

Backend should run on:

```
http://localhost:5000
```

Set API URL in frontend:

```js
const BASE_URL = "http://localhost:5000";
```

---

## 🛠️ Tech Stack

### Frontend
- React JS
- React Router
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Others
- REST APIs
- CORS

---

## ✨ Features

### 🛍️ Product Management
- View all products
- View single product
- Add products
- Delete products

---

### 🗂️ Category Management
- View all categories
- Add categories
- Fetch category by name or ID

---

### 🛒 Cart System
- View carts
- Fetch cart by ID
- Manage items

---

### ❤️ Wishlist
- View wishlist
- Fetch wishlist by ID

---

### 📦 Order Management
- Create orders
- View orders

---

### 📍 Address Management
- View all addresses
- Fetch address by ID

---

## 🔗 API Reference

### 🛍️ Products
GET /products  
GET /products/:productId  
POST /products  
DELETE /products/:productId  

---

### 🗂️ Categories
GET /categories  
GET /categories/:categoryName  
GET /categories/:categoryId  
POST /categories  

---

### 📦 Orders
GET /orders  
POST /orders  

---

### ❤️ Wishlist
GET /wishlist  
GET /wishlist/:wishlistId  

---

### 🛒 Cart
GET /carts  
GET /carts/:cartId  

---

### 📍 Address
GET /address  
GET /address/:addressId  

---

## 📬 Contact

📧 tusharkumar74761@gmail.com

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!