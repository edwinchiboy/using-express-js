// // const fs = require('fs');
// // const path = require('path');

// const db = require("../util/database");

// const Cart = require("./cart");

// // const p = path.join(
// //   path.dirname(process.mainModule.filename),
// //   'data',
// //   'products.json'
// // );

// //
// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   // save() {
//   //   getProductsFromFile(products => {
//   //     if (this.id) {
//   //       const existingProductIndex = products.findIndex(
//   //         prod => prod.id === this.id
//   //       );
//   //       const updatedProducts = [...products];
//   //       updatedProducts[existingProductIndex] = this;
//   //       fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//   //         console.log(err);
//   //       });
//   //     } else {
//   //       this.id = Math.random().toString();
//   //       products.push(this);
//   //       fs.writeFile(p, JSON.stringify(products), err => {
//   //         console.log(err);
//   //       });
//   //     }
//   //   });
//   // }

//   save() {
//     return db.execute(
//       "INSERT INTO  products (title, price, `image-url`, description) VALUES (?, ?, ?, ?)",
//       [this.title, this.price, this.imageUrl, this.description],
//     );
//   }

//   // static deleteById(id) {
//   //   getProductsFromFile((products) => {
//   //     const product = products.find((prod) => prod.id === id);
//   //     const updatedProducts = products.filter((prod) => prod.id !== id);
//   //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//   //       if (!err) {
//   //         Cart.deleteProduct(id, product.price);
//   //       }
//   //     });
//   //   });
//   // }

//   static deleteById() {}

//   // static fetchAll(cb) {
//   //   getProductsFromFile(cb);
//   // }

//   static fetchAll() {
//     return db.execute("SELECT * FROM products ");
//   }

//   //   static findById(id, cb) {
//   //     getProductsFromFile((products) => {
//   //       const product = products.find((p) => p.id === id);
//   //       cb(product);
//   //     });
//   //   }
//   // };

//   static findById(id) {
//     return db.execute("SELECT * FROM products p WHERE p.id = ?", [id]);
//   }
// };

// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Product;

// const mongoDb = require("mongodb");
// const getDb = require("../util/database").getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     //  Fix: Check if it's already an object, or convert if it's a valid string
//     if (id && typeof id === "string" && id.trim() !== "") {
//       this._id = new mongoDb.ObjectId(id);
//     } else if (id) {
//       this._id = id; // It's already an ObjectId instance from the database!
//     } else {
//       this._id = null;
//     }
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;

//     if (this._id) {
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongoDb.ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongoDb.ObjectId(prodId) })
//       .then((product) => {
//         return product;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// }

// module.exports = Product;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
