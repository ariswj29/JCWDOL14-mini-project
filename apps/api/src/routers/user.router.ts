import {
  createUsers,
  deleteUsers,
  getAllUsers,
  getUserById,
  updateUsers,
} from '@/controllers/user.controller';
import { adminGuard, verifyToken } from '@/middleware/jwt.middleware';
import { Router } from 'express';

const router = Router();

router.get('/', verifyToken, adminGuard, getAllUsers);
router.post('/', verifyToken, adminGuard, createUsers);
router.get('/:id', verifyToken, adminGuard, getUserById);
router.put('/:id', verifyToken, adminGuard, updateUsers);
router.delete('/:id', verifyToken, adminGuard, deleteUsers);

export default router;
