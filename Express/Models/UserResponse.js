class UserResponse {
    constructor(user) {
        this.id = user.id;
        this.nome = user.nome;
        this.email = user.email;
        this.password = user.password;
        this.roles = user.roles;
    }

}

export default UserResponse;
