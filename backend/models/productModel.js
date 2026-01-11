const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");
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