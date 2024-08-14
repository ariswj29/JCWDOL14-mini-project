import { NextFunction, Request, Response, Router } from 'express';
import {
  register,
  login,
  checkReferralCode,
  verificationEmail,
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verification-email', verificationEmail);
router.post('/check-referral-code', checkReferralCode);

export default router;
