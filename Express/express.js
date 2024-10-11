    import express from 'express';
    import swaggerUi from 'swagger-ui-express';
    import swaggerDocument from './swagger.json' assert { type: 'json' };
    import usuariosRouter from './routes/usuarios.js'; 

    const app = express();
    app.use(express.json());

    app.use('/usuarios', usuariosRouter);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.listen(3000, () => {
        console.log('Server is listening on http://localhost:3000');
        console.log('Swagger docs available at http://localhost:3000/api-docs');
    });
