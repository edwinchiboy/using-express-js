const path = require('path');
const express = require('express');
const router = express.Router();

const rootDir = require('../util/path');


// app.use((req, res, next) => {
//     console.log('First middleware');
//     next();// Allows the request to continue to the next middleware function in the stack
// });


// router.get("/",(req, res) => {
//     // console.log('second middleware');
//     res.status(200).send('<h1>Hello from Express.js</h1>');
// });

router.get("/",(req, res) => {
    // console.log('second middleware');
    res.status(200).sendFile(path.join(rootDir, 'views', 'shop.html')   );
});


module.exports = router;