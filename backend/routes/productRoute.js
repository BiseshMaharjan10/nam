const express = require("express").Router();

const {getallProducts, addProduct, getProductById, getProductByName}=require('../controllers/productController')

express.get("/getallProducts",getallProducts);
express.get("/getproductById/:productid",getProductById);
express.get("/getproductByName/:productname",getProductByName);
express.post("/addProducts",addProduct);

module.exports=express;