import { createReview, getAllReview } from '@/controllers/review.controller';
import { adminGuard, verifyToken } from '@/middleware/jwt.middleware';
import { Router } from 'express';

const router = Router();

router.post('/', createReview);
router.get('/', verifyToken, adminGuard, getAllReview);

export default router;
