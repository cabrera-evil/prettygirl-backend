# Requests

You must use the following routes for every request:


Auth
-

        GET /auth/
        GET /auth/validate/:token
        POST /auth/login

Bag
-

        GET /bags
        GET /bags/:user_id
        GET /bags/products/:bag_id
        POST /bags
        PUT /bags/:bag_id
        DELETE /bags/:bag_id

Booking
-

        GET /bookings
        GET /bookings/:id
        POST /bookings
        PUT /bookings/:id
        DELETE /bookings/:id

Category
-

        GET /categories
        GET /categories/:id
        POST /categories
        PUT /categories/:id
        DELETE /categories/:id

Product
-

        GET /products
        GET /products?:filters
        GET /products/:id
        POST /products
        PUT /products/:id
        DELETE /products/:id

User
-

        GET /users
        GET /users/:id
        POST /users
        PUT /users/:id
        DELETE /users/:id

## Release Notes

v 1.0.0

## Useful Links

[API Documentation](https://documenter.getpostman.com/view/23770643/2s8YsxvWz1)

[Deployed on Railway](https://prettygirl-api-production.up.railway.app/)