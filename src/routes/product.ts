import { Router } from 'express';
import {
  getLimitedEdition,
  getProducts,
  Handpicked,
  Popular,
  newArrivals,
  search,
} from '@controllers/product';
const router = Router();

router.get('/', getProducts);
router.get('/limited', getLimitedEdition);
router.get('/handpicked', Handpicked);
router.get('/Popular', Popular);
router.get('/new', newArrivals);
router.get('/search', search);

export default router;
