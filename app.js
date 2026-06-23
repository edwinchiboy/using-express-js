// const http = require('http');
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const expressHbs = require("express-handlebars");
// const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const app = express();

const get404Controller = require("./controllers/error");
// const sequelize = require("./util/database");
// const Product = require("./models/product");
// const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart_item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order_item");

// app.set("view engine", "pug"); // This line sets the view engine for the Express application to "pug". Pug is a template engine that allows you to generate HTML dynamically. By setting the view engine, you can render Pug templates when handling requests and send the generated HTML as a response to the client.

// app.set("views", "views"); // This line sets the directory where the view templates are located. In this case, it specifies that the views are located in a folder named "views". When you render a view, Express will look for the template files in this directory. For example, if you render a view called "index", Express will look for a file named "index.pug" (or "index.handlebars" if using Handlebars) in the "views" directory.

// app.engine(
//   "handlebars",
//   expressHbs.engine({
//     defaultLayout: true,
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extensions: ["handlebars", "hbs"],
//   }),
// );// this line registers the Handlebars view engine with Express. It specifies that the view engine is "handlebars" and provides configuration options for the Handlebars engine. The options include setting a default layout, specifying the directory for layouts, and defining the default layout file. This allows you to use Handlebars templates to generate HTML responses in your Express application.

// app.set("view engine", "handlebars"); // This line sets the view engine for the Express application to "handlebars". By setting the view engine, you can render Handlebars templates when handling requests and send the generated HTML as a response to the client.

app.set("view engine", "ejs"); // This line sets the view engine for the Express application to "ejs". EJS (Embedded JavaScript) is a simple templating language that lets you generate HTML markup with plain JavaScript. By setting the view engine to "ejs", you can render EJS templates when handling requests and send the generated HTML as a response to the client.
app.set("views", "views"); // This line sets the directory where the view templates are located. In this case, it specifies that the views are located in a folder named "views". When you render a view, Express will look for the template files in this directory. For example, if you render a view called "index", Express will look for a file named "index.ejs" in the "views" directory.

const adminRoute = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const { FORCE } = require("sequelize/lib/index-hints");

app.use(bodyParser.urlencoded({ extended: false })); // Parses incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(express.static(path.join(__dirname, "public"))); // This middleware serves static files from the "public" directory. It allows you to access files like CSS, images, and JavaScript files directly from the browser without needing to define specific routes for them.

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user; // Creating associations using sequelize
  //     next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });'

  User.findById("6a3a661b2353f2748a5f9d52")
    .then((user) => {
      // req.user = new User(user.name, user.email, user.cart, user._id); // Creating associations using mongo db
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoute); // This middleware will be executed for any route that starts with "/admin". It will pass the request to the adminRoutes router for further handling.
app.use(shopRoutes);

app.use(get404Controller.get404); // This line adds a middleware function to handle 404 errors. If no route matches the incoming request, this middleware will be executed, and it will render a 404 error page or send a 404 response to the client.

// const server = http.createServer(app);
// server.listen(3000)

// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });  //Sequelize setup
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
//   .sync({ force: true })
//   // .sync()
//   .then((result) => {
//     return User.findByPk(1);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({
//         name: "max",
//         email: "test@gamil.com",
//       });
//     }
//     return Promise.resolve(user);
//   })
//   .then((user) => {
//     return user.createCart();
//   })
//   .then((cart) => {
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// mongoConnect(() => {
//   app.listen(3000);
// });

mongoose
  .connect(
    "mongodb+srv://choboyedeh17:Qwert!2345@cluster0.pnin6iw.mongodb.net/shop?appName=Cluster0",
  )
  .then((result) => {
    return User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Chiboy",
          email: "choboy.edeh17@Gmail.com",
          cart: {
            items: [],
          },
        });
        return user.save();
      }
      return user;
    });
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
