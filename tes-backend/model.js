const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// Model for Categories
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Category name must be provided
  },
});

// Model for Products
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Product name must be provided
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false, // Product description must be provided
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true, // Image is optional
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Category ID must be provided
    references: {
      model: Category, // Linking to the Category model
      key: 'id',
    },
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false, // Price must be provided
  },
});

// Define the relationship between Category and Product
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

// Sync models with the database
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced successfully.");
}).catch((error) => {
  console.error("Error syncing database:", error);
});

module.exports = { Product, Category };
