// Imports the important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// Imports the database connection from config.js
const sequelize = require('../config/connection');

// Initializes the Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Establishes the fields and rules/validations for the Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validation: {
        isDecimal: true
      }
    },

    stock: {
      type: DataTypes.INTEGER,
      defaultvalue: 10,
      validation: {
        isNumeric: true
      }
    },

    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
