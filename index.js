
// Dependêncies de pacotes externos
import express from 'express';
import cors from 'cors';
// Dependências de módulos locais 
import { routesInitialize } from './src/router/routes.js';
import db from './database/db.js';
import setAssociations from './database/associations.js';



const port = 3001;
var api = express();
api.use(cors());
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

