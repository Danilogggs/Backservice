import User from './User.js';

class CreateUser {
    constructor(nome, email, password, role = 'user') { 
        if (!nome || !email || !password || password.length < 4) {
            throw new Error('Dados de entrada inválidos');
        }
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    toUser() {
        return new User(this.nome, this.email, this.password, [this.role]);
    }
}

export default CreateUser;
