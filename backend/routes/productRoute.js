const express = require("express").Router();

const {getallProducts, addProduct}=require('../controllers/productController.js');

express.get("/getallProducts",getallProducts);
express.post("/addProducts",addProduct);

module.exports=express;