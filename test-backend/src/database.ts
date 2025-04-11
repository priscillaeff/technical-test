import { Sequelize } from 'sequelize';
import path from 'path';

// Use path.join to ensure the database file is created in the project root
// relative to the dist folder where the compiled code runs.
const storagePath = process.env.NODE_ENV === 'test'
  ? ':memory:' // Use in-memory database for tests if needed
  : path.join(__dirname, '../../database.sqlite'); // Points to project root from dist/src

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false, // Disable logging for cleaner output, enable if needed for debugging
});

export default sequelize; 