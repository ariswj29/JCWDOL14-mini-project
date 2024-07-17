import {
  createEvents,
  deleteEvent,
  getAllEvents,
  getEvent,
  getPagination,
  getSearchEvents,
  updateEvent,
} from '@/controllers/events.controller';
import { Router } from 'express';
import upload from '@/middleware/uploader';

const router = Router();

// Tambahkan middleware multer ke dalam route POST dan PUT
router.post('/', upload.single('image'), createEvents);
router.get('/', getAllEvents);
router.get('/', getSearchEvents);
router.get('/', getPagination);
router.get('/:id', getEvent);
router.put('/:id', upload.single('image'), updateEvent);
router.delete('/:id', deleteEvent);

export default router;
