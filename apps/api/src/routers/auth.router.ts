import { NextFunction, Request, Response, Router } from 'express';
import { register, getAllUsers, login } from '../controllers/auth.controller';

const router = Router();

router.get('/', getAllUsers);
router.post('/register', register);
router.post('/login', login);

export default router;
