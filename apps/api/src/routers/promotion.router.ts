import {
  createPromotion,
  deletePromotion,
  getAllPromotions,
  getPromotion,
  selectEvent,
  updatePromotion,
} from '@/controllers/promotion.controller';
import { Router } from 'express';

const router = Router();

router.post('/', createPromotion);
router.get('/', getAllPromotions);
router.get('/select-event', selectEvent);
router.get('/:id', getPromotion);
router.put('/:id', updatePromotion);
router.delete('/:id', deletePromotion);

export default router;
