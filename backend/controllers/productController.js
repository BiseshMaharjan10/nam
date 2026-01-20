const Product = require("../models/ProductModel.js")

const getallProducts = async (req,res) => {
    try{
        const products = await Product.findAll({});
        if(!products){
            return res.status(404).json({
                message : "Database is Empty"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Products Fetched Sucessfully",
            data : products
        })
    }catch(error){
        res.status(500).json({
            message: "Error While Fetching Products",
            error : error.message
        })
    }
};

const getProductById = async (req,res) => {
    try{
        const productid = req.params.productid;
        const product = await Product.findByPk(productid);
        if(!product){
            return res.status(404).json({
                message : "Product Not Available with The Requested ID"
            })
        }
        res.status(200).json({
            success : true,
            message : "Product Sucessfully Fetched",
            data : product
        })
    }catch(error){
        res.status(500).json({
            message : "Error While Fetching Product",
            error : error.message
        })
    }
};


const getProductByName = async (req,res) => {
    try{
        const productname = req.params.productname
        const product = await Product.findAll({where : {productName : productname}})
        if(!product){
            return res.status(404).json({
                message : "Product Not Available with The Requested Name"
            })
        }
        res.status(200).json({
            message : "Product Sucessfully Fetched",
            data : {
                product
            }
        })
    }catch(error){
        res.status(500).json({
            message : "Error While Fetching Product",
            error : error.message
        })
    }
};


const addProduct = async (req,res) => {
    try{
        const { productName, quantity, rate} = req.body;
        if(!productName || !quantity || !rate){
            return res.status(400).json({
                message: "All Fields are Required"
            });
        }
        const newProduct = await Product.create({
            productName,
            quantity,   
            rate
        });
        res.status(201).json({
            success : true,
            message: "Product Addded Succesfully",
            product: newProduct
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error while Adding Product",
            error: error.message
        });
    }
}

module.exports={
    getallProducts,
    getProductById,
    getProductByName,
    addProduct
}