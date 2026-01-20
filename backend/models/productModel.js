const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/Database");
const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        thumbnail:{
            type:DataTypes.STRING, // single image
            allowNull:true,
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "products",
        timestamps: true
    }
)

module.exports= Product