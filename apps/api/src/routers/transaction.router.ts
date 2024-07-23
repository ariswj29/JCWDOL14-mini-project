import { ticketTransaction } from '@/controllers/transaction.controller';
import { Router } from 'express';

const router = Router();

router.post('/buy-ticket', ticketTransaction);

export default router;
