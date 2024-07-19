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

const router = Router();

// Tambahkan middleware multer ke dalam route POST dan PUT
router.post('/', upload.single('image'), createEvents);
router.get('/', getAllEvents);
router.get('/table', getAllTableEvent);
router.get('/:id', getEvent);
router.put('/:id', upload.single('image'), updateEvent);
router.delete('/:id', deleteEvent);

export default router;
