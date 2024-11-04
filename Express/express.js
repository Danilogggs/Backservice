import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };
import usuariosRoutes from './routes/usuarios.js';
import rolesRoutes from './routes/roles.js';
import { UserController } from './Controller/UserController.js';

const app = express();
const PORT = 3000;

// Middleware para log das requisições HTTP
app.use(morgan('combined')); // Usa o formato 'combined' para logs detalhados

// Configuração do middleware para JSON
app.use(express.json());

// Função para logar eventos customizados
const logEvent = (message) => console.log(`[LOG] ${new Date().toISOString()} - ${message}`);

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/express', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => logEvent('Conectado ao MongoDB com sucesso!'))
.catch(error => logEvent(`Erro ao conectar ao MongoDB: ${error.message}`));

// Rotas
app.use('/usuarios', usuariosRoutes);
app.use('/roles', rolesRoutes);

// Log de rota de login
app.post('/login', (req, res, next) => {
    logEvent('Rota de login acessada');
    next();
}, UserController.login);

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Log para erro em rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada' });
    logEvent(`Rota não encontrada: ${req.originalUrl}`);
    next();
});

// Log para erros no servidor
app.use((err, req, res, next) => {
    logEvent(`Erro no servidor: ${err.message}`);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    logEvent(`Servidor rodando em http://localhost:${PORT}`);
    logEvent(`Swagger em http://localhost:${PORT}/api-docs`);
});
