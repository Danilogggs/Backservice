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

export default User;
