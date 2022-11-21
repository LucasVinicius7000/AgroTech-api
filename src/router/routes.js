// Importa os controllers
import { CadastrarUsuario, ListarUsuarios, LoginUsuario, IsLogged } from '../controllers/UserController.js';
import { CadastrarColetaCompleta } from '../controllers/FazendaController.js'

// Inicializa as rotas 
async function routesInitialize(api) {

    // Rota inicial (apenas para teste de conexão)
    api.get('/', (req, res) => {
        res.send("Api is running...");
    })

    // GETs
    api.get('/user/listar', ListarUsuarios);
    api.get('/user/isLogged', IsLogged);


    // POSTs
    api.post('/user/cadastrar', CadastrarUsuario);
    api.post('/user/login', LoginUsuario);
    api.post('/fazenda/cadastrar/coleta', CadastrarColetaCompleta);


}

export { routesInitialize };