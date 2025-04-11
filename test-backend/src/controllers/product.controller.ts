import { Request, Response } from 'express';
import { Product, Category } from '../model'; // Import Category to check existence
import { ValidationError } from 'sequelize';

// Check if category exists before creating/updating product
async function checkCategoryExists(categoryId: number): Promise<boolean> {
  const category = await Category.findByPk(categoryId);
  return !!category;
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category_id } = req.body;

    // Validate category_id existence
    if (!(await checkCategoryExists(category_id))) {
        res.status(400).json({ error: `Category with ID ${category_id} does not exist.` });
        return;
    }

    const product = await Product.create(req.body);
    res.status(201).json(product); // Use 201 Created status
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        error: 'Validation Error',
        details: error.errors.map((e) => e.message),
      });
    } else {
      console.error('Server Error:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  }
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
 try {
    const products = await Product.findAll({ include: [{ model: Category, as: 'category' }] }); // Include category info
    res.status(200).json(products);
 } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Server Error' });
 }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
     if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const product = await Product.findByPk(id, { include: [{ model: Category, as: 'category' }] }); // Include category info
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
     console.error('Server Error:', error);
     res.status(500).json({ error: 'Server Error' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
     if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }

    const { category_id } = req.body;

    // If category_id is being updated, validate its existence
    if (category_id !== undefined && !(await checkCategoryExists(category_id))) {
        res.status(400).json({ error: `Category with ID ${category_id} does not exist.` });
        return;
    }

    const [updated] = await Product.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      const updatedProduct = await Product.findByPk(id, { include: [{ model: Category, as: 'category' }] }); // Fetch updated product with category
      res.status(200).json(updatedProduct); // Return updated product data
    } else {
       // Check if the product exists before declaring not found
      const productExists = await Product.findByPk(id);
      res.status(productExists ? 400 : 404).json({ error: productExists ? 'Update failed or no changes made' : 'Product not found' });
    }
  } catch (error) {
     if (error instanceof ValidationError) {
      res.status(400).json({
        error: 'Validation Error',
        details: error.errors.map((e) => e.message),
      });
    } else {
      console.error('Server Error:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
 try {
    const id = parseInt(req.params.id, 10);
     if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const deleted = await Product.destroy({
      where: { id: id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Product deleted successfully' }); // Use 200 OK and clear message
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
 } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Server Error' });
 }
}; 