import {
  getAllTransaction,
  getTransaction,
  ticketTransaction,
} from '@/controllers/transaction.controller';
import { Router } from 'express';

const router = Router();

router.get('/', getAllTransaction);
router.get('/:id', getTransaction);
router.post('/buy-ticket', ticketTransaction);

export default router;
