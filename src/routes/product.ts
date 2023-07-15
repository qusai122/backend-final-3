import { Router } from 'express';
import {
  getLimitedEdition,
  getProducts,
  getHandpicked,
  getPopular,
  getNewArrivals,
  search,
} from '@controllers/product';
const router = Router();

router.get('/', getProducts);
router.get('/limited', getLimitedEdition);
router.get('/handpicked', getHandpicked);
router.get('/popular', getPopular);
router.get('/new', getNewArrivals);
router.get('/search', search);

export default router;
