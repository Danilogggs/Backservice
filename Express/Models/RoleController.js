import rolesRepository from './rolesRepository.js'; // Certifique-se de adicionar a extensão .js e usar o nome correto

class RoleController {
    static createRole(req, res) {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const role = rolesRepository.createRole(name, description);
        return res.status(201).json(role);
    }

    static getRoles(req, res) {
        const roles = rolesRepository.getRoles();
        return res.status(200).json(roles);
    }
}

export default RoleController;
