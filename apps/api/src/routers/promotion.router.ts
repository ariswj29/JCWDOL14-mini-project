import {
  createPromotion,
  deletePromotion,
  getAllPromotions,
  getPromotion,
  selectEvent,
  updatePromotion,
} from '@/controllers/promotion.controller';
import { adminGuard, verifyToken } from '@/middleware/jwt.middleware';
import { Router } from 'express';

const router = Router();

router.post('/', verifyToken, adminGuard, createPromotion);
router.get('/', verifyToken, adminGuard, getAllPromotions);
router.get('/select-event', verifyToken, adminGuard, selectEvent);
router.get('/:id', verifyToken, adminGuard, getPromotion);
router.put('/:id', verifyToken, adminGuard, updatePromotion);
router.delete('/:id', verifyToken, adminGuard, deletePromotion);

export default router;
