
import User from './User.js';

class CreateUserRequest {
    constructor(nome, email, password) {
        if (!nome || !email || !password || password.length < 4) {
            throw new Error('Dados de entrada inválidos');
        }
        this.nome = nome;
        this.email = email;
        this.password = password;
    }

    toUser() {
        return new User(this.nome, this.email, this.password);
    }
}

export default CreateUserRequest;
