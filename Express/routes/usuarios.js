import express from 'express';
import { UserController } from '../Controller/UserController.js';

const router = express.Router();

// métodos
router.post('/', UserController.createUser);
router.get('/', UserController.listUsers);
router.get('/:id', UserController.findUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
