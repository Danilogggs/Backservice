let userIdCounter = 1;

class User {
    constructor(nome, email, password) {
        this.id = userIdCounter++;
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.roles = new Set();
    }

    addRole(role) {
        this.roles.add(role);
    }
}

export default User;
