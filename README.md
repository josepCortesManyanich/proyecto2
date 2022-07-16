# Chill & Pill

## Description

This is a project developed by Josep and Ali as the project for the second module at Ironhack. The application is about a Shop of CBD: cannabidiol, where user will able to buy our products from the store, add products to cart, delete products from the cart and pay at the checkout page with a credit card.

---

## Wireframes

![](/public/images/wireframe1.png)
![](/public/images/wireframe2.png)
![](/public/images/wireframe3.png)
![](/public/images/wireframe4.png)

---

## Instructions

When cloning the project, change the <code>sample.env</code> for an <code>.env</code> with the values you consider:

```js
PORT = 3000;
MONGO_URL = "mongodb://localhost/dbName";
SESSION_SECRET = "SecretOfYourOwnChoosing";
NODE_ENV = "development";
```

Then, run:

```bash
npm install
```

To start the project run:

```bash
npm run start
```

---

## User stories (MVP)

What can the user do with the app?

- User can sign up and create and account
- User can login
- User can log out
- User can add products to the cart
- User can Delete products from the cart
- User can Pay at the checkout page

## User stories (Backlog)

- User can edit User name
- User can can edit email address

---

## Models

User:

```js
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required."],
    },
  },
  {
    timestamps: true,
  }
);
```

Cart:

```js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartModel = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
```

payment:

```js
const mongoose = require("mongoose");
const { Schema } = mongoose;
const paymentModel = new Schema(
  {
    method: {
      type: String,
      enum: ["Credit card", "In cash"],
    },
    adress: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
```

Product:

```js
const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  family: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["oil", "flower"],
  },
  price: {
    type: Number,
    required: true,
  },
  cbd: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
});
```

## Useful links

- [Github Repo](https://github.com/josepCortesManyanich/proyecto2)
- [Deployed version](https://brrcbd.herokuapp.com/)
- [Presentation slides](https://slides.com/wajahatali/deck)
