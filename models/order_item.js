const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Order = require("./order");

const orderItem = sequelize.define("order_item", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = Order;
