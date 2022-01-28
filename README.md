# Grocery API
An API for inventory management, scoped to a small grocery store.

## Install

1. Clone the repo:

    ```sh
    gh repo clone POWRFULCOW89/Grocery-API
    ```

    or [download](https://github.com/POWRFULCOW89/Grocery-API/archive/refs/heads/main.zip) as ZIP. 

2. Install the dependencies:

    ```sh
    npm i 
    ```

3. Run the tests:

    ```sh
    npm test
    ```

4. Run the app:

    ```sh
    npm run dev
    ```

An environment file is required in the project root, containg the `MONGO_URI` and `SAMPLE_TOKEN` variables for MongoDB and testing, respectively.

## Project
The current project is built with [Express](https://expressjs.com/es/), a Node.js framework for backend code. [Mongoose](https://mongoosejs.com) is used as Object Document Mapper along with the NoSQL database [MongoDB](https://www.mongodb.com/es). Unit tests are modeled with [Chai](https://www.chaijs.com) and run with [Mocha](https://mochajs.org). As authentication mechanism, a local strategy is implemented with [Passport](http://www.passportjs.org). Finally, the API is deployed to [Heroku](https://www.heroku.com).

### Project requirements

#### Users

- **Admin**: Super user that can generate reports, manage inventory and users.
- **Manager**: Logged in user that can manage the inventory and cashier users.
- **Cashier**: User that can make, edit and close sales.

#### Models

- **Product**:
    - Name, category, stock, price, code.
- **User**:
    - Username, name, email, password, role.
- **Sale**:
    - Products, quantity, subtotal, total.

### API Documentation

The Grocery API documentation can be consulted in [Swagger Hub](https://app.swaggerhub.com/apis-docs/Bedu-Back-19/ProyectoFinalBack/1.0.2).

### Team

- [Rogelio Magaña Tapia](https://github.com/MaganaRogelio)
- [Diego Domínguez Melo](https://github.com/POWRFULCOW89)

