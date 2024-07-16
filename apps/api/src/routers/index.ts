import express from 'express';
import auth from './auth.router';
import event from './events.router';
import profile from './profile.router';
import user from './user.router';

const router = express.Router();

router.use('/api/auth', auth);
router.use('/api/events', event);
router.use('/api/profile', profile);
router.use('/api/users', user);

export default router;
