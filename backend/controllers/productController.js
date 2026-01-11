const Product = require("../models/ProductModel.js")

const getallProducts = async (req,res) => {
    res.json({message:"this is the get all products"});
};

const getProductById = async (req,res) => {
    res.json({message:"this is the get product by ID"});
};


const getProductByName = async (req,res) => {
    res.json({message:"this is the get Products Name"});
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