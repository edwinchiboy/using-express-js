const path = require("path");
const express = require("express");
const router = express.Router();

const rootDir = require("../util/path");

const products = [];

router.get("/add-product", (req, res, next) => {
  // res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html')   );
  res.status(200).render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
});

router.get("/update-product", (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, "views", "update-product.html"));
});

// app.use("/product", (req, res, next) => {
//     console.log(req.body);
//     res.redirect("/");
//  });

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
});

// module.exports = router;

exports.routes = router;
exports.products = products;
