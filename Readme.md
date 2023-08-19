# API Documentation README

## Table of Contents

- [Authentication](#authentication)
  - [Register a New User](#register-a-new-user)
  - [Log In](#log-in)
  
- [Products](#products)
  - [List Products](#list-products)
  - [Get Product by ID](#get-product-by-id)
  - [Create New Product](#create-new-product)
  
- [Cart](#cart)
  - [Add Product to Cart](#add-product-to-cart)
  - [Get User's Cart Items](#get-users-cart-items)
  - [Remove Item from Cart](#remove-item-from-cart)
  
- [Orders](#orders)
  - [Place Order](#place-order)
  - [Get User's Order History](#get-users-order-history)

---

## Authentication

### Register a New User

- **URL:** `/api/users/`
- **Method:** POST
- **Description:** Register a new user.
- **Request Body:**
  - `name` (string, required): User's name.
  - `email` (string, required): User's email.
  - `password` (string, required): User's password.
  - `pic` (string): User's profile picture URL.
- **Response:**
  - `user` (object): User information.
  - `token` (string): JWT token for authentication.

### Log In

- **URL:** `/api/users/login`
- **Method:** POST
- **Description:** Log in an existing user.
- **Request Body:**
  - `email` (string, required): User's email.
  - `password` (string, required): User's password.
- **Response:**
  - `user` (object): User information.
  - `token` (string): JWT token for authentication.

## Products

### List Products

- **URL:** `/api/product/`
- **Method:** GET
- **Description:** Get a list of products.
- **Protected Route:** Requires authentication.
- **Response:**
  - Array of product objects.

### Get Product by ID

- **URL:** `/api/products/:id`
- **Method:** GET
- **Description:** Get details of a specific product by ID.
- **Protected Route:** Requires authentication.
- **Response:**
  - Product object.

### Create New Product

- **URL:** `/api/product/create`
- **Method:** POST
- **Description:** Create a new product.
- **Protected Route:** Requires authentication.
- **Request Body:**
  - `title` (string, required): Product title.
  - `price` (number, required): Product price.
  - `description` (string, required): Product description.
  - `availability` (number, required): Product availability.
  - `category` (string, required): Product category.
- **Response:**
  - Created product object.

## Cart

### Add Product to Cart

- **URL:** `/api/cart/:id`
- **Method:** POST
- **Description:** Add a product to the user's cart.
- **Protected Route:** Requires authentication.
- **Request Body:**
  - `qty` (number): Quantity of the product.
- **Response:**
  - Message indicating successful addition.

### Get User's Cart Items

- **URL:** `/api/cart/cart-item`
- **Method:** GET
- **Description:** Get the user's cart items.
- **Protected Route:** Requires authentication.
- **Response:**
  - Array of cart item objects.

### Remove Item from Cart

- **URL:** `/api/cart/:id`
- **Method:** DELETE
- **Description:** Remove an item from the user's cart.
- **Protected Route:** Requires authentication.
- **Response:**
  - Message indicating successful removal.

## Orders

### Place Order

- **URL:** `/api/orders/place-order`
- **Method:** POST
- **Description:** Place an order using items from the user's cart.
- **Protected Route:** Requires authentication.
- **Request Body:**
  - `status` (string, required): Order status.
  - `iscancelled` (boolean): Order cancellation status.
- **Response:**
  - Message indicating successful order placement.
  - Order object.

### Get User's Order History

- **URL:** `/api/orders/order-history`
- **Method:** GET
- **Description:** Get the user's order history.
- **Protected Route:** Requires authentication.
- **Response:**
  - Array of order objects.

---

