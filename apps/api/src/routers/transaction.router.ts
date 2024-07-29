import {
  getAllTransaction,
  getTransaction,
  ticketTransaction,
} from '@/controllers/transaction.controller';
import { adminGuard, verifyToken } from '@/middleware/jwt.middleware';
import { Router } from 'express';

const router = Router();

router.get('/', verifyToken, adminGuard, getAllTransaction);
router.get('/:id', verifyToken, getTransaction);
router.post('/buy-ticket', verifyToken, ticketTransaction);

export default router;
