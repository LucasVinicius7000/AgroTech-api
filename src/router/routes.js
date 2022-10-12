// Importa os controllers
import { CadastrarUsuario, ListarUsuarios } from '../controllers/UserController.js';
import { CadastrarColetaCompleta } from '../controllers/FazendaController.js'

// Inicializa as rotas 
async function routesInitialize(api) {

    // Rota inicial (apenas para teste de conexão)
    api.get('/', (req, res) => {
        res.send("Api is running...");
    })

    // GETs
    api.get('/user/listar', ListarUsuarios);


    // POSTs
    api.post('/user/cadastrar', CadastrarUsuario);
    api.post('/fazenda/cadastrar/coleta', CadastrarColetaCompleta);


}

export { routesInitialize };