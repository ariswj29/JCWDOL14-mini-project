import { Router } from 'express';
import { getDashboard } from '@/controllers/dashboard.controller';
import { adminGuard, verifyToken } from '@/middleware/jwt.middleware';

const router = Router();

router.get('/', verifyToken, adminGuard, getDashboard);

export default router;
