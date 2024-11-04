import User from '../Models/User.js';
import Role from '../Models/role.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

class UserController {
    static async createUser(req, res) {
        try {
            const { nome, email, password, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                nome,
                email,
                password: hashedPassword,
                roles: role ? [role] : [],
            });

            const user = await newUser.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).send();
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const { nome, email, password } = req.body;
            const updateData = { nome, email };
            if (password) updateData.password = await bcrypt.hash(password, 10);

            const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
            if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) return res.status(404).send();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async addRoleToUser(req, res) {
        try {
            const { id, roleName } = req.params;

            const user = await User.findById(id);
            if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

            if (!user.roles.includes(roleName)) {
                user.roles.push(roleName);
                await user.save();
            } else {
                return res.status(400).json({ error: 'Usuário já possui essa role' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return res.status(401).json({ error: 'Senha inválida' });

            const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login realizado', token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export { UserController };
