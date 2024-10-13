import CreateUser from '../Models/CreateUser.js';
import UpdateUser from '../Models/UpdateUser.js';
import UserResponse from '../Models/UserResponse.js';
import express from 'express';

const router = express.Router();
let usuarios = [];

class UserController {
    static createUser(req, res) {
        try {
            const createUser = new CreateUser(req.body.nome, req.body.email, req.body.password);
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
            const updateUser = new UpdateUser(req.body.nome);
            const user = usuarios.find(user => user.id === parseInt(req.params.id));
            if (!user) {
                return res.status(404).send();
            }

            user.nome = updateUser.nome;
            const userResponse = new UserResponse(user);
            res.json(userResponse);
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
}

export { UserController, router };
