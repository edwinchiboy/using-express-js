const path = require("path");
const express = require("express");
const router = express.Router();

const rootDir = require("../util/path");
const adminData = require("./admin");

// app.use((req, res, next) => {
//     console.log('First middleware');
//     next();// Allows the request to continue to the next middleware function in the stack
// });

// router.get("/",(req, res) => {
//     // console.log('second middleware');
//     res.status(200).send('<h1>Hello from Express.js</h1>');
// });

router.get("/", (req, res) => {
  // res.status(200).sendFile(path.join(rootDir, 'views', 'shop.html'));
  const products = adminData.products;
  res.status(200).render("shop", {
    prods: products,
    docTitle: "Shop",
    path: "/",
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
