import express from 'express';
const router = express.Router();

let usuarios = [];

router.post('/', (request, response) => {
    const { nome, email } = request.body;

    if (!nome || !email) {
        return response.status(400).send('Nome e email são obrigatórios');
    }

    const criarUser = {
        id: usuarios.length + 1,
        nome,
        email
    };

    usuarios.push(criarUser);

    response.status(201).json(criarUser);
});

router.get('/', (request, response) => {
    response.status(200).json(usuarios);
});

export default router;