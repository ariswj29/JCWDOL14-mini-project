import { createEvents } from '@/controllers/events.controller';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.post('/', createEvents);

export default router;
