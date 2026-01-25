const { Sequelize } = require("sequelize");
require("dotenv").config();

const 

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect:"postgres",
        logging: false,
        port: process.env.DB_PORT || 5432,
    }
);

const connectDB = async () =>{
    try{
        await sequelize.authenticate();
        console.log("PostgresSQL connected successfully:");
    }catch(error){
        console.error("Unable to connect to database the database:", error);
    }
};

module.exports = {sequelize, connectDB};