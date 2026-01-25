const express = require("express").Router();
const uploadProductImages = require("../helpers/multer");


const {getAllProducts, addProduct}=require('../controllers/productController');
const authGuard = require("../helpers/authGuard");
const isAdmin = require("../helpers/isAdmin");

express.get("/getallProducts",getAllProducts);
// express.get("/getproductById/:productid",authGuard,isAdmin,uploadProductImages, getProductById);
// express.get("/getproductByName/:productname",getProductByName);
express.post("/addProducts",uploadProductImages,addProduct);

module.exports=express;