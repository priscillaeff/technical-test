const express = require('express');
const sequelize = require('./database');
const productRoutes = require('./routes');

const app = express();
app.use(express.json());
app.use('/', productRoutes);

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced!');
});
