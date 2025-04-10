const express = require('express');
const router = express.Router();
const Product = require('./model');

// Create
router.post('/products', async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// Read all
router.get('/products', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Read one
router.get('/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  product ? res.json(product) : res.status(404).send('Not found');
});

// Update
router.put('/products/:id', async (req, res) => {
  const [updated] = await Product.update(req.body, {
    where: { id: req.params.id }
  });
  updated ? res.json({ message: 'Updated' }) : res.status(404).send('Not found');
});

// Delete
router.delete('/products/:id', async (req, res) => {
  const deleted = await Product.destroy({
    where: { id: req.params.id }
  });
  deleted ? res.json({ message: 'Deleted' }) : res.status(404).send('Not found');
});

module.exports = router;
