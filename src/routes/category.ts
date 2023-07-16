import { Router } from 'express';
import { getAllCategories, getCategoryProducts } from '@controllers/category';
const router = Router();

router.get('/', getAllCategories);
router.get('/products/:id', getCategoryProducts);

export default router;
