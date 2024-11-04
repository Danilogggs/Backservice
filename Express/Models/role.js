class Role {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
});

module.exports = mongoose.model('Role', roleSchema);

export default Role;
