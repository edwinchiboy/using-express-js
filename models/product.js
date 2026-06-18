// const products = [];
const fs = require("fs");
const path = require("path");

const productsPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json",
);

const getProductsFromFile = (cb) => {
  fs.readFile(productsPath, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent));
  });
};

module.exports = class product {
  constructor(title) {
    this.title = title;
  }

  save() {
    // products.push(this);
    //  products.push(this);
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(productsPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    // return products;
    getProductsFromFile(cb);
  }
};
