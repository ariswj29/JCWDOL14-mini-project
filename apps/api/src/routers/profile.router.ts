import {
  editProfile,
  getProfile,
  topUpSaldo,
} from '@/controllers/profile.controller';
import { Router } from 'express';

const router = Router();

router.get('/:id', getProfile);
router.put('/:id', editProfile);
router.put('/top-up/:id', topUpSaldo);

export default router;
