// Importa os controllers
import { CadastrarUsuario, ListarUsuarios } from '../controllers/UserController.js';


// Inicializa as rotas 
async function routesInitialize(api) {

    // Rota inicial (apenas para teste de conexão)
    api.get('/', (req, res) => {
        res.send("Api is running...");
    })

    // GETs
    api.get('/users/listar', ListarUsuarios);


    // POSTs
    api.post('/users/cadastrar', CadastrarUsuario)



}

export { routesInitialize };