// const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }))// Parses incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(express.static(path.join(__dirname, 'public')));// This middleware serves static files from the "public" directory. It allows you to access files like CSS, images, and JavaScript files directly from the browser without needing to define specific routes for them.  

app.use("/admin",adminRoutes);// This middleware will be executed for any route that starts with "/admin". It will pass the request to the adminRoutes router for further handling. 
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'page-not-found.html'));
});


// const server = http.createServer(app);
// server.listen(3000)

app.listen(3000);