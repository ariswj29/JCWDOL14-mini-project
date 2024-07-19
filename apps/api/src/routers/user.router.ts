import {
  createUsers,
  deleteUsers,
  getAllUsers,
  getUserById,
  updateUsers,
} from '@/controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUsers);
router.delete('/:id', deleteUsers);

export default router;
