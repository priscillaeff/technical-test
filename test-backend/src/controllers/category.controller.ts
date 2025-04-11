import { Request, Response } from 'express';
import { Category } from '../model';
import { ValidationError } from 'sequelize'; // Import ValidationError

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
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

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const category = await Category.findByPk(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
     if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const [updated] = await Category.update(req.body, {
      where: { id: id },
    });
    if (updated) {
       const updatedCategory = await Category.findByPk(id); // Fetch the updated category
       res.status(200).json(updatedCategory);
    } else {
      // Check if the category exists before declaring not found
      const categoryExists = await Category.findByPk(id);
      res.status(categoryExists ? 400 : 404).json({ error: categoryExists ? 'Update failed or no changes made' : 'Category not found' });
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

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
     const id = parseInt(req.params.id, 10);
     if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const deleted = await Category.destroy({
      where: { id: id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Category deleted successfully' }); // Changed to 200 OK and clearer message
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
     // Handle potential foreign key constraint errors if deleting a category with products
     if (error instanceof Error && 'name' in error && error.name === 'SequelizeForeignKeyConstraintError') {
       res.status(409).json({ error: 'Cannot delete category as it is associated with existing products.' });
     } else {
       console.error('Server Error:', error);
       res.status(500).json({ error: 'Server Error' });
     }
  }
}; 