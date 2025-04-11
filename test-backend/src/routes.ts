import { Router } from 'express';
import * as productController from './controllers/product.controller';
import * as categoryController from './controllers/category.controller';

const router = Router();

// --- Product Routes ---

router.post('/products', productController.createProduct);

router.get('/products', productController.getAllProducts);

router.get('/products/:id', productController.getProductById);

router.put('/products/:id', productController.updateProduct);

router.delete('/products/:id', productController.deleteProduct);


// --- Category Routes ---

router.post('/categories', categoryController.createCategory);

router.get('/categories', categoryController.getAllCategories);

router.get('/categories/:id', categoryController.getCategoryById);

router.put('/categories/:id', categoryController.updateCategory);

router.delete('/categories/:id', categoryController.deleteCategory);


export default router; 