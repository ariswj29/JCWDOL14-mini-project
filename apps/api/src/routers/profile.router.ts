import {
  editProfile,
  getProfile,
  topUpSaldo,
} from '@/controllers/profile.controller';
import { verifyToken } from '@/middleware/jwt.middleware';
import { Router } from 'express';

const router = Router();

router.get('/:id', verifyToken, getProfile);
router.put('/:id', verifyToken, editProfile);
router.put('/top-up/:id', verifyToken, topUpSaldo);

export default router;
