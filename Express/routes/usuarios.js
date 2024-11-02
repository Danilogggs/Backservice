import express from 'express';
import { UserController } from '../Controller/UserController.js';

const router = express.Router();

// métodos
router.post('/', UserController.createUser);
router.get('/', UserController.listUsers);
router.get('/:id', UserController.findUserById);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.put('/:id/roles/:roleName', UserController.addRoleToUser);
router.post('/login', UserController.login)

export default router;
