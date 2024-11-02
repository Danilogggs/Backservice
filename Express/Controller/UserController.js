import CreateUser from '../Models/CreateUser.js';
import UpdateUser from '../Models/UpdateUser.js';
import UserResponse from '../Models/UserResponse.js';
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
let usuarios = [];

class UserController {
    static createUser(req, res) {
        try {
            const { nome, email, password, role } = req.body;
            const createUser = new CreateUser(nome, email, password, role);
            const user = createUser.toUser();

            const existingUser = usuarios.find(u => u.email === user.email);
            if (existingUser) {
                return res.status(400).json({ error: 'Usuário já existe' });
            }

            usuarios.push(user);
            const userResponse = new UserResponse(user);
            res.status(201).json(userResponse);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    static listUsers(req, res) {
        res.status(200).json(usuarios.map(user => new UserResponse(user)));
    }

    static findUserById(req, res) {
        const user = usuarios.find(user => user.id === parseInt(req.params.id));
        if (!user) {
            return res.status(404).send();
        }
        const userResponse = new UserResponse(user);
        res.json(userResponse);
    }

    static updateUser(req, res) {
        try {
            const user = usuarios.find(user => user.id === parseInt(req.params.id));
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
    
            const { nome, email, password } = req.body;
            const updateUser = new UpdateUser({ nome, email, password });
    
            if (updateUser.nome !== undefined) user.nome = updateUser.nome;
            if (updateUser.email !== undefined) user.email = updateUser.email;
            if (updateUser.password !== undefined) user.password = updateUser.password;
    
            const userResponse = new UserResponse(user);
            res.status(200).json(userResponse);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    

    static deleteUser(req, res) {
        const userIndex = usuarios.findIndex(user => user.id === parseInt(req.params.id));
        if (userIndex === -1) {
            return res.status(404).send();
        }

        usuarios.splice(userIndex, 1);
        res.status(204).send();
    }

    static addRoleToUser(req, res) {
        const { id, roleName } = req.params;

        const user = usuarios.find(user => user.id === parseInt(id));
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        if (!Array.isArray(user.roles)) {
            user.roles = [];
        }

        if (user.roles.includes(roleName)) {
            return res.status(400).json({ error: 'Já possui role' });
        }

        user.roles.push(roleName);
        const userResponse = new UserResponse(user);
        res.status(200).json(userResponse);
    }

    static login(req, res) {
        const { email, password } = req.body;

        const user = usuarios.find(user => user.email === email && user.password === password);
        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado ou senha inválida' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            message: "Login realizado",
            token: token
        });
    }

}

router.post('/', UserController.createUser);
router.get('/', UserController.listUsers);
router.get('/:id', UserController.findUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.put('/:id/roles/:roleName', UserController.addRoleToUser);
router.post('/login', UserController.login);

export { UserController, router };
