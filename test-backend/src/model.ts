import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './database';

// Interface for Category attributes
interface CategoryAttributes {
  id: number;
  name: string;
}

// Interface for Category creation attributes (id is optional)
interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

// Category Model
class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Category name cannot be empty" },
    }
  },
}, {
  sequelize,
  tableName: 'Categories', // Explicit table name
});

// Interface for Product attributes
interface ProductAttributes {
  id: number;
  name: string;
  desc: string;
  image?: string | null; // Allow null or string
  category_id: number;
  price: number; // Keep price as it's used in tests
}

// Interface for Product creation attributes (id is optional)
interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

// Product Model
class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public desc!: string;
  public image!: string | null;
  public category_id!: number;
  public price!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association getter
  public readonly category?: Category;
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: { msg: "Product name cannot be empty" },
    }
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
     validate: {
        notEmpty: { msg: "Product description cannot be empty" },
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true, // Image is optional
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
    validate: {
        isInt: { msg: "Category ID must be an integer" },
    }
  },
  price: {
    type: DataTypes.INTEGER, // Assuming price is integer based on test
    allowNull: false,
    validate: {
        isInt: { msg: "Price must be an integer" },
        min: { args: [0], msg: "Price cannot be negative" }
    }
  },
}, {
  sequelize,
  tableName: 'Products', // Explicit table name
});

// Define Associations
Category.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'products', // Alias for the association
});
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category', // Alias for the association
});

export { Product, Category, ProductAttributes, CategoryAttributes }; 