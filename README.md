# API Documentation

## Authentication

### Sign Up

- **URL:** `/api/signup`
- **Method:** `POST`
- **Description:** Creates a new user account.
- **Request Body:**
  - `name` (String, required): User's name.
  - `email` (String, required): User's email address.
  - `password` (String, required): User's password.
  - `phoneNumber` (String, required): User's phone number.
- **Response:** JSON object representing the newly created user and authentication token.

### Log In

- **URL:** `/api/login`
- **Method:** `POST`
- **Description:** Logs in an existing user.
- **Request Body:**
  - `email` (String, required): User's email address.
  - `password` (String, required): User's password.
- **Response:** JSON object representing the logged-in user and authentication token.

### Log Out

- **URL:** `/api/logout`
- **Method:** `GET`
- **Description:** Logs out the current user by clearing the authentication token.
- **Response:** JSON object with a logout message.

### Get User Profile

- **URL:** `/api/me`
- **Method:** `GET`
- **Description:** Retrieves the profile of the currently logged-in user.
- **Authentication required.**
- **add the token in headers**

  `headers: {
 Authorization: Bearer ${token},
}`

- **Response:** JSON object representing the user's profile.

## Products

### Add a Product

- **URL:** `/api/products`
- **Method:** `POST`
- **Description:** Adds a new product to the database.
- **Request Body:**
  - `asin` (String, required): Amazon Standard Identification Number.
  - `bought_in_past_month` (Boolean, optional): Whether the product was bought in the past month.
  - `image` (String, optional): URL of the product image.
  - `is_best_seller` (Boolean, optional): Whether the product is a best seller.
  - `is_climate_pledge_friendly` (Boolean, optional): Whether the product is climate pledge friendly.
  - `is_limited_time_deal` (Boolean, optional): Whether the product is a limited time deal.
  - `is_prime` (Boolean, optional): Whether the product is prime eligible.
  - `is_sponsored` (Boolean, optional): Whether the product is sponsored.
  - `original_price` (Number, optional): Original price of the product.
  - `price` (Number, required): Current price of the product.
  - `rating_count` (Number, optional): Number of ratings the product has received.
  - `stars` (Number, optional): Average star rating of the product.
  - `title` (String, required): Title of the product.
  - `url` (String, required): URL of the product.
- **Response:** JSON object representing the newly added product.

### Get All Products

- **URL:** `/api/products`
- **Method:** `GET`
- **Description:** Retrieves all products from the database.
- **Response:** Array of JSON objects representing products.

### Get Product Details

- **URL:** `/api/getProductDetails`
- **Method:** `GET`
- **Description:** Retrieves detailed information about a product using its ASIN.
- **Query Parameters:**
  - `asin` (String, required): Amazon Standard Identification Number.
- **Response:** JSON object representing the product details.

## Cart

### Add to Cart

- **URL:** `/api/add-to-cart`
- **Method:** `POST`
- **Description:** Adds a product to the user's cart.
- **Authentication required.**
- **add the token in headers**

  `headers: {
    Authorization: Bearer ${token},
}`

- **Request Body:**
  - `asin` (String, required): Amazon Standard Identification Number.
  - `quantity` (Number, optional): Quantity of the product to add (default is 1).
- **Response:** JSON object representing the updated cart.

### Clear Cart

- **URL:** `/api/clear-cart`
- **Method:** `DELETE`
- **Description:** Clears all items from the user's cart.
- **Authentication required.**
- **add the token in headers**

  `headers: {
  Authorization: Bearer ${token},
}`

- **Response:** No content.

### Delete from Cart

- **URL:** `/api/delete/:asin`
- **Method:** `DELETE`
- **Description:** Deletes a specific product from the user's cart.
- **Authentication required.**
- **add the token in headers**

  `headers: {
  Authorization: Bearer ${token},
}`

- **Path Parameters:**
- `asin` (String, required): Amazon Standard Identification Number of the product to delete.
- **Response:** JSON object representing the updated cart.

### Decrement Quantity

- **URL:** `/api/decrement/:asin`
- **Method:** `PUT`
- **Description:** Decrements the quantity of a product in the user's cart.
- **Authentication required.**
- **add the token in headers**

  `headers: {
  Authorization: Bearer ${token},
}`

- **Path Parameters:**
  - `asin` (String, required): Amazon Standard Identification Number of the product to decrement quantity.
- **Request Body:**
  - `quantity` (Number, optional): Quantity to subtract (default is 1).
- **Response:** JSON object representing the updated cart.

### Get Cart

- **URL:** `/api/cart`
- **Method:** `GET`
- **Description:** Retrieves the user's cart.
- **Authentication required.**
- **add the token in headers**

  `headers: {
  Authorization: Bearer ${token},
}`

- **Response:** JSON object representing the user's cart.
