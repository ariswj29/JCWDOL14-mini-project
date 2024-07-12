import express from 'express';
import user from './auth.router';
import event from './events.router';

const router = express.Router();

router.use('/api/users', user);
router.use('/api/events', event);

export default router;
