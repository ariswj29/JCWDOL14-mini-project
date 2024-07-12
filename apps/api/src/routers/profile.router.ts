import { getProfile } from '@/controllers/profile.controller';
import { Router } from 'express';

const router = Router();

router.get('/:id', getProfile);

export default router;
