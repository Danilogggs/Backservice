class UpdateUser {
    constructor({ nome, email, password }) {
        if (nome !== undefined && nome.trim() === '') {
            throw new Error('O nome não pode estar vazio');
        }

        this.nome = nome;
        this.email = email;
        this.password = password;
    }
}

export default UpdateUser;
