let userIdCounter = 1;

class User {
    constructor(nome, email, password, roles = []) {
        this.id = userIdCounter++;
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}

import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: [String], default: [] }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default User; 
export { Usuario }; 
