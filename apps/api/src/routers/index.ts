import express from 'express';
import user from './auth.router';

const router = express.Router();

router.use('/api/users', user);

export default router;
