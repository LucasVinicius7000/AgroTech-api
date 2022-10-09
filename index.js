
// Dependêncies de pacotes externos
import express from 'express';

// Dependências de módulos locais 
import { routesInitialize } from './src/router/routes.js';
import db from './database/db.js';


const port = 3001;
var api = express();
api.use(express.json());


try {
    db.sync();
    console.log("Banco de dados conectado!");
} catch (error) {
    console.log(`Falha ao se conectar com o banco de dados: ${error}`);
}



api.listen(port, async () => {
    await routesInitialize(api); // Inicializa todas rotas
})

export { api };

