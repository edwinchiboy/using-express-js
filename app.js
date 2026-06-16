// const http = require('http');
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const app = express();

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

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false })); // Parses incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(express.static(path.join(__dirname, "public"))); // This middleware serves static files from the "public" directory. It allows you to access files like CSS, images, and JavaScript files directly from the browser without needing to define specific routes for them.

app.use("/admin", adminData.routes); // This middleware will be executed for any route that starts with "/admin". It will pass the request to the adminRoutes router for further handling.
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  res.status(404).render("404", { docTitle: "Page Not Found" });
});

// const server = http.createServer(app);
// server.listen(3000)

app.listen(3000);
