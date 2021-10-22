# This app has been made with Node and PostgreSQL

###### The PostgreSQL database was chosen to solve the problem of double booking using PostgreSQL's row level locking feature.


# Architecture

![alt text](https://github.com/mahesh863/booking-backend/blob/master/src/Booking.drawio.png)


## Frontend Codes Can be Found Here

https://github.com/mahesh863/booking-frontend


## Params

1. productById: Get Product By Id



## Routes

### Authentication
1. POST : /signup - To create user account
2. POST : /signin - To signin a user
3. POST : /signout - To signout the user 

### Booking

1. POST : /view/seats/:productId - View Seats
2. POST : /search/products - Search For Products
3. GET : /new/addition/products - Recently Added Products
4. POST : /search/product/id - Get Product By Id
5. GET : /featured/products  - Get Featured Products
6. POST : /get/products/category - Get Product By Category
7. GET : /get/all/categories - Get All Categories
8. POST: /payment - Make Payment And Book Selected Seats


### Admin 

1. POST : /create -  Create Product
2. PUT : /edit -  Edit Product
3. DELETE : /delete - Delete Product
4. GET : /get/all/products - Get all products
5. POST : /create/seats/:productId - Create Seats
6. POST : /create/category - Create New Category
7. PUT : /edit/category - Edit Category
8. DELETE : /delete/category - Delete Category



This app is a personal project which is a basic implementation of "Ticket Booking App".

## What can be done in the app
1. Search For Shows.
2. Book Seats and payment.
3. Admin Pannel To Create and Delete Products

## Future Plans
1. Add Previous Order Lists done by the user.
