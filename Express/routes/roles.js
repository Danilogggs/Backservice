import express from 'express';
import RoleController from '../Models/RoleController.js';

const router = express.Router();

router.post('/', RoleController.createRole);
router.get('/', RoleController.getRoles);

export default router;
