import { createReview, getAllReview } from '@/controllers/review.controller';
import { Router } from 'express';

const router = Router();

router.post('/', createReview);
router.get('/', getAllReview);

export default router;
