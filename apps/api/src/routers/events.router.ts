import {
  createEvents,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from '@/controllers/events.controller';
import upload from '@/middleware/uploader';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.post('/', upload.single('image'), createEvents);
router.get('/', getAllEvents);
router.get('/:id', getEvent);
router.put('/:id', upload.single('image'), updateEvent);
router.delete('/:id', deleteEvent);

export default router;
