const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html')   );
  res.status(200).render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getAddProducts = (req, res) => {
  // res.status(200).sendFile(path.join(rootDir, 'views', 'shop.html'));
  Product.fetchAll((products) => {
    res.status(200).render("shop", {
      prods: products,
      docTitle: "Shop",
      path: "/",
      activeShop: true,
      productCSS: true,
    });
  });
};
