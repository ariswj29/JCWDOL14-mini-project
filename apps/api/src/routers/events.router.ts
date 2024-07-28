import {
  createEvents,
  deleteEvent,
  getAllEvents,
  getAllTableEvent,
  getEvent,
  updateEvent,
} from '@/controllers/events.controller';
import { Router } from 'express';
import upload from '@/middleware/uploader';
import { adminGuard, verifyToken } from '@/middleware/jwt.middleware';

const router = Router();

router.post('/', verifyToken, adminGuard, upload.single('image'), createEvents);
router.get('/', getAllEvents);
router.get('/table', verifyToken, adminGuard, getAllTableEvent);
router.get('/:id', getEvent);
router.put(
  '/:id',
  verifyToken,
  adminGuard,
  upload.single('image'),
  updateEvent,
);
router.delete('/:id', verifyToken, adminGuard, deleteEvent);

export default router;
