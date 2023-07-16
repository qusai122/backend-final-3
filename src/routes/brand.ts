import { Router } from 'express';
import { getBrandProducts, getBrands } from '@controllers/brand';
const router = Router();

router.get('/', getBrands);
router.get('/products/:id', getBrandProducts);

export default router;
