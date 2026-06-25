// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const Order = sequelize.define("order", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
// });

// module.exports = Order;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      productData: { type: Object, required: true },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    email: {
      type: String,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
