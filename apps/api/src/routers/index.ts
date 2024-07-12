import express from 'express';
import user from './auth.router';
import event from './events.router';
import profile from './profile.router';

const router = express.Router();

router.use('/api/users', user);
router.use('/api/events', event);
router.use('/api/profile', profile);

export default router;
