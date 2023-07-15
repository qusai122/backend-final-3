import express from 'express';
import { dbConnection } from '@database/index';
import ProductRoutes from '@routes/product';

const app = express();

dbConnection.sync({ alter: false });

app.use('/product', ProductRoutes);

export default app;
