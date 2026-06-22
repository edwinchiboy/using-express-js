// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// const User = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = User;

const mongoDb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongoDb.ObjectId;

class User {
  constructor(userName, email, cart, id) {
    this.name = userName;
    this.email = email;
    this.cart = cart;
    //  Fix: Check if it's already an object, or convert if it's a valid string
    if (id && typeof id === "string" && id.trim() !== "") {
      this._id = new mongoDb.ObjectId(id);
    } else if (id) {
      this._id = id; // It's already an ObjectId instance from the database!
    } else {
      this._id = null;
    }
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    // 1. Fallback initialization: If cart or items don't exist, safely default to an empty array
    const cartItems = this.cart && this.cart.items ? this.cart.items : [];

    // 2. Now it's safe to scan the array without crashing
    const cartProductIndex = cartItems.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const UpdatedCartItems = [...cartItems];

    if (cartProductIndex >= 0) {
      newQuantity = cartItems[cartProductIndex].quantity + 1;
      UpdatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      UpdatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updateCart = {
      items: UpdatedCartItems,
    };

    const db = getDb();
    return db.collection("users").updateOne(
      { _id: this._id }, // No need to wrap it since it's already an ObjectId from the DB
      { $set: { cart: updateCart } },
    );
  }

  getCart() {
    const db = getDb();

    const cartItems = this.cart && this.cart.items ? this.cart.items : [];

    const productIds = cartItems.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return this.cart;
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });

    const db = getDb();
    return db.collection("users").updateOne(
      { _id: this._id }, // No need to wrap it since it's already an ObjectId from the DB
      { $set: { cart: { items: updatedCartItems } } },
    );
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
        return db.collection("users").updateOne(
          { _id: this._id }, // No need to wrap it since it's already an ObjectId from the DB
          { $set: { cart: { items: [] } } },
        );
      });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user._id": new ObjectId(this._id) })
      .toArray();
  }

  static findById(userId) {
    const db = getDb();
    // return db.collection("users").find({ _id: new ObjectId(userId) }).next();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
