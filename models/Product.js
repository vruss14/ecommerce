// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        notNull: true
      }
    },
    
    product_name: {
      type: DataTypes.STRING,
      validation: {
        notNull: true
      }
    },

    price: {
      type: DataTypes.DECIMAL,
      validation: {
        notNull: true,
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
