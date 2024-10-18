const express = require("express")
const productController = require("../Controllers/productController.js");

const router = express.Router();

router.post('/addproduct', productController.addProduct);
router.post('/removeproduct', productController.removeProduct);
router.get('/allproducts',productController.allProducts);
router.get('/newcollections', productController.newCollections);
router.get('/popular-in-women', productController.popularInWomen);

module.exports = router; 