import express, { Application, Request, Response, NextFunction } from 'express';
import sequelize from './database';
import routes from './routes'; // Import the combined routes
import { Category } from './model'; // Import models if needed directly (e.g., for seeding)

const app: Application = express();

// --- Middleware ---
app.use(express.json()); // Parse JSON bodies

// --- Routes ---
app.use('/', routes); // Use the combined router for all API endpoints

// --- Basic Root Route ---
app.get('/', (req: Request, res: Response) => {
    res.send('API is running.');
});

// --- Global Error Handler (Example - Optional Enhancement) ---
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// --- Database Sync and Server Start ---
const PORT = process.env.PORT || 4000;
const forceSync = process.env.NODE_ENV !== 'production'; // Force sync only in non-production

sequelize.sync({ force: forceSync }) // Use force: true carefully, good for dev/test reset
  .then(async () => {
    console.log('Database synchronized successfully.');

    // Create initial category if it doesn't exist
    const defaultCategoryCount = await Category.count({ where: { name: 'Default' } });
    if (defaultCategoryCount === 0) {
        await Category.create({ name: 'Default' });
        console.log('Initial "Default" category created.');
    } else {
        console.log('"Default" category already exists.');
    }

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
    process.exit(1); // Exit if database connection fails
  }); 