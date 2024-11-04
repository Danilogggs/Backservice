import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };
import usuariosRoutes from './routes/usuarios.js';
import rolesRoutes from './routes/roles.js';
import { UserController } from './Controller/UserController.js';

const app = express();
const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
app.use(express.json());

app.use('/usuarios', usuariosRoutes); 
app.use('/roles', rolesRoutes);

app.post('/login', UserController.login);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log('Server ==> mongodb://localhost:27017/express');
    console.log('Swagger ==> http://localhost:3000/api-docs');
});


