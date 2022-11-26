
// Dependêncies de pacotes externos
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Dependências de módulos locais 
import { routesInitialize } from './src/router/routes.js';
import db from './database/db.js';
import setAssociations from './database/associations.js';


//aaaaaaaaaaa
const port = 3001;
dotenv.config('.env');
var api = express();
api.use(cors({
    "origin": process.env.CLIENT_URL,
    "credentials": true
}));
api.use(express.json());

try {
    setAssociations();
    db.sync();
    console.log("Banco de dados conectado!");
} catch (error) {
    console.log(`Falha ao se conectar com o banco de dados: ${error}`);
}



api.listen(port, async () => {
    await routesInitialize(api); // Inicializa todas rotas
})


export { api };

