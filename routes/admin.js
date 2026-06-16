const path = require('path');
const express = require('express');
const router = express.Router();

const rootDir = require('../util/path');

router.use("/add-product", (req, res, next) => {
        res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html')   );
    });

router.get("/update-product",(req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'views', 'update-product.html')   );
});

// app.use("/product", (req, res, next) => {
//     console.log(req.body);
//     res.redirect("/");
//  });
router.post("/product", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});
 
module.exports = router;