const fs = require("fs");
const path = require("path");

const PDFDocument = require("pdfkit");

const Product = require("../models/product");
const Order = require("../models/order");

const { where } = require("sequelize");
const order = require("../models/order");

const ITMES_PER_PAGE = 2;

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.render("shop/product-list", {
//       prods: products,
//       pageTitle: "All Products",
//       path: "/products",
//     });
//   });
// };

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll()
//     .then(([rows, fieldData]) => {
//       res.render("shop/product-list", {
//         prods: rows,
//         pageTitle: "All Products",
//         path: "/products",
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.getProducts = (req, res, next) => {
//   // Product.findAll()
//   Product.fetchAll()
//     .then((products) => {
//       res.render("shop/product-list", {
//         prods: products,
//         pageTitle: "All Products",
//         path: "/products",
//       });
//     })
//     .catch((err) => console.log(err));
// };

exports.getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  Product.find()
    .countDocuments()
    .then((numProducts) => {
      totalItems = numProducts;
      return Product.find()
        .skip((page - 1) * ITMES_PER_PAGE)
        .limit(ITMES_PER_PAGE);
    })
    // Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        currentPage: page,
        hasNextPage: ITMES_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITMES_PER_PAGE),
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId, (product) => {
//     res.render("shop/product-detail", {
//       product: product,
//       pageTitle: product.title,
//       path: "/products",
//     });
//   });
// };

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//     .then(([product]) => {
//       res.render("shop/product-detail", {
//         product: product[0],
//         pageTitle: product.title,
//         path: "/products",
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   // Product.findByPk(prodId)
//   Product.findById(prodId)
//     .then((product) => {
//       res.render("shop/product-detail", {
//         product: product,
//         pageTitle: product.title,
//         path: "/products",
//       });
//     })
//     .catch((err) => console.log(err));
// };

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findAll({
//     where: {
//     id:prodId
//   }})
//     .then((products) => {
//       res.render("shop/product-detail", {
//         product: products[0],
//         pageTitle: products[0].title,
//         path: "/products",
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.getIndex = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.render("shop/index", {
//       prods: products,
//       pageTitle: "Shop",
//       path: "/",
//     });
//   });
// };

// exports.getIndex = (req, res, next) => {
//   Product.fetchAll()
//     .then(([rows, fieldData]) => {
//       res.render("shop/index", {
//         prods: rows,
//         pageTitle: "Shop",
//         path: "/",
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.getIndex = (req, res, next) => {
//   // Product.findAll()
//   Product.fetchAll()
//     .then((products) => {
//       res.render("shop/index", {
//         prods: products,
//         pageTitle: "Shop",
//         path: "/",
//       });
//     })
//     .catch((err) => console.log(err));
// };

exports.getIndex = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  // Product.findAll()
  Product.find()
    .countDocuments()
    .then((numProducts) => {
      totalItems = numProducts;
      return Product.find()
        .skip((page - 1) * ITMES_PER_PAGE)
        .limit(ITMES_PER_PAGE);
    })
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        currentPage: page,
        hasNextPage: ITMES_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITMES_PER_PAGE),
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.getCart = (req, res, next) => {
//   // Cart.getProducts((cart) => {
//   //   Product.fetchAll((products) => {
//   //     const cartproducts = [];
//   //     for (product of products) {
//   //       const cartProductData = cart.products.find(
//   //         (prod) => prod.id === product.id,
//   //       );
//   //       if (cartProductData) {
//   //         cartproducts.push({ productData: product, qty: cartProductData.qty });
//   //       }
//   //     }
//   //     res.render("shop/cart", {
//   //       path: "/cart",
//   //       pageTitle: "Your Cart",
//   //       products: cartproducts,
//   //     });
//   //   });
//   // });

//   // req.user
//   //   .getCart()
//   //   .then((cart) => {
//   //     return cart.getProducts();
//   //   })
//   //   .then((products) => {
//   //     res.render("shop/cart", {
//   //       path: "/cart",
//   //       pageTitle: "Your Cart",
//   //       products: products,
//   //     });
//   //   })
//   //   .catch((err) => console.log(err));

//   req.user
//     .getCart()
//     .then((products) => {
//       res.render("shop/cart", {
//         path: "/cart",
//         pageTitle: "Your Cart",
//         products: products,
//       });
//     })
//     .catch((err) => console.log(err));
// };

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   // Product.findById(prodId, (product) => {
//   //   Cart.addProduct(prodId, product.price);
//   // });
//   // res.redirect("/cart");

//   let fetchedCart;

//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts({
//         where: {
//           id: prodId,
//         },
//       });
//     })
//     .then((products) => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }
//       let newQuantity = 1;
//       if (product) {
//       }
//       return product
//         .findById(prodId)
//         .then((product) => {
//           return fetchedCart.addProduct(product, {
//             through: { quantity: newQuantity },
//           });
//         })
//         .catch((err) => console.log(err));
//     })
//     .catch((err) => console.log(err));
// };

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    });

  // let fetchedCart;
  // let newQuantity = 1;

  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products) => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }

  //     // Case 1: Product is ALREADY in the cart
  //     if (product) {
  //       const oldQuantity = product.cart_item.quantity; // Access the join table quantity
  //       newQuantity = oldQuantity + 1;
  //       return product; // Pass it to the next step
  //     }

  //     // Case 2: Product is NEW to the cart. Fetch it from the global Product model
  //     return Product.findByPk(prodId);
  //   })
  //     .then((product) => {
  //       // Add the product (whether found in cart or global DB) to the fetched cart
  //       return fetchedCart.addProduct(product, {
  //         through: { quantity: newQuantity },
  //       });
  //     })
  //     .then(() => {
  //       res.redirect("/cart"); // Redirect after database finishes updating
  //     })
  //     .catch((err) => console.log(err));
};

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, (product) => {
//     Cart.deleteProduct(prodId, product.price);
//     res.redirect("/cart");
//   });
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;

//   // req.user
//   //   .getCart()
//   //   .then((cart) => {
//   //     return cart.getProducts({ where: { id: prodId } });
//   //   })
//   //   .then((products) => {
//   //     const product = products[0];
//   //     return product.cart_item.destroy();
//   //   })
//   //   .then(() => {
//   //     res.redirect("/cart");
//   //   })
//   //   .catch((err) => console.log(err));

//   req.user
//     .deleteItemFromCart(prodId)
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch((err) => console.log(err));
// };

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  req.user
    .removeFromCart(prodId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({ include: ["products"] })
//     .then((orders) => {
//       res.render("shop/orders", {
//         path: "/orders",
//         pageTitle: "Your Orders",
//         orders: orders,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders()
//     .then((orders) => {
//       res.render("shop/orders", {
//         path: "/orders",
//         pageTitle: "Your Orders",
//         orders: orders,
//       });
//     })
//     .catch((err) => console.log(err));
// };

exports.getOrders = (req, res, next) => {
  return Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.postOrder = (req, res, next) => {
//   // let fetchedCart;
//   // req.user
//   //   .getCart()
//   //   .then((cart) => {
//   //     fetchedCart = cart;
//   //     return cart.getProducts();
//   //   })
//   //   .then((products) => {
//   //     return req.user
//   //       .createOrder()
//   //       .then((order) => {
//   //         return order.addProducts(
//   //           products.map((product) => {
//   //             product.order_item = { quantity: product.cart_item.quantity };
//   //             return product;
//   //           }),
//   //         );
//   //       })
//   //       .then((result) => {
//   //         return fetchedCart.setProducts(null);
//   //       })
//   //       .then((result) => {
//   //         res.redirect("/orders");
//   //       })

//   //       .catch((err) => console.log(err));
//   //   })

//   //   .catch((err) => console.log(err));

//   req.user
//     .addOrder()
//     .then(() => {
//       res.redirect("/orders");
//     })

//     .catch((err) => console.log(err));
// };

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, productData: { ...i.productId._doc } };
      });

      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products: products,
      });

      order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })

    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return next(new Error("No order found."));
        if (order.user.userId.toString !== req.user._id.toString) {
          return next(new Error("Unauthorized"));
        }
      }
      const invoiceName = "invoice-" + orderId + ".pdf";
      const invoicePath = path.join("data", "invoices", invoiceName);

      // fs.readFile(invoicePath, (err, data) => { reading the file into the memory  before serving it
      //   if (err) {
      //     console.log("Wrong file Id");

      //     return next();
      //   }
      //   res.setHeader("Content-Type", "application/pdf");
      //   res.setHeader(
      //     "Content-Disposition",
      //     'inline; filename="' + invoiceName + '"',
      //   );
      //   res.send(data);
      // });

      // const file = fs.createReadStream(invoicePath); // Streaming the file in chunk
      // res.setHeader("Content-Type", "application/pdf");
      // res.setHeader(
      //   "Content-Disposition",
      //   'inline; filename="' + invoiceName + '"',
      // );

      // file.pipe(res);

      const pdfDoc = new PDFDocument();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="' + invoiceName + '"',
      );

      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(26).text("Invoice", {
        underline: true,
      });

      pdfDoc.fontSize(18).text("-----------------------");

      let totalPrice = 0;

      order.products.forEach((prod) => {
        totalPrice += prod.quantity * prod.productData.price;
        pdfDoc
          .fontSize(18)
          .text(
            prod.productData.title +
              "-" +
              prod.quantity +
              " x " +
              "$" +
              prod.productData.price,
          );
      });
      pdfDoc.text("-----------------------");

      pdfDoc.text("Total Price : $" + totalPrice);

      pdfDoc.end();
    })
    .catch((err) => next(err));
};
