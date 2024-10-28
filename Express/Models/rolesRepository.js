let roles = [];
let currentId = 1;

const createRole = (name, description) => {
    const role = {
        id: currentId++,
        name,
        description
    };
    roles.push(role);
    return role;
};

const getRoles = () => {
    return roles;
};

const findRoleByName = (name) => {
    return roles.find(role => role.name === name);
};

export default {
    createRole,
    getRoles,
    findRoleByName
};
