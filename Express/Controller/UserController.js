import CreateUserRequest from '../models/CreateUserRequest.js';
import UpdateUserRequest from '../models/UpdateUserRequest.js';
import UserResponse from '../models/UserResponse.js';

let usuarios = [];

class UserController {
    static createUser(req, res) {
        try {
            const createUserRequest = new CreateUserRequest(req.body.nome, req.body.email, req.body.password);
            const user = createUserRequest.toUser();

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
            const updateUserRequest = new UpdateUserRequest(req.body.nome);
            const user = usuarios.find(user => user.id === parseInt(req.params.id));
            if (!user) {
                return res.status(404).send();
            }

            user.nome = updateUserRequest.nome;
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

export default UserController;
