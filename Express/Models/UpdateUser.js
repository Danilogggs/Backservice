
class UpdateUserRequest {
    constructor(nome) {
        if (!nome) {
            throw new Error('O nome não pode estar vazio');
        }
        this.nome = nome;
    }
}

export default UpdateUserRequest;
