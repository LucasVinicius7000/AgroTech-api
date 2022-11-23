// Importa os controllers
import { CadastrarUsuario, ListarUsuarios, LoginUsuario, IsLogged } from '../controllers/UserController.js';
import { CadastroDadosColeta, CadastroInicioColeta, FinalizaColetaIniciada, GetFazendaByUserId, ListAllColetasByIdUser } from '../controllers/FazendaController.js'

// Inicializa as rotas 
async function routesInitialize(api) {

    // Rota inicial (apenas para teste de conexão)
    api.get('/', (req, res) => {
        res.send("Api is running...");
    })

    // GETs
    api.get('/user/listar', ListarUsuarios);
    api.get('/user/isLogged', IsLogged);
    api.get('/fazenda/buscarFazenda', GetFazendaByUserId);
    api.get('/coletas/listaColetas', ListAllColetasByIdUser)

    // POSTs
    api.post('/user/cadastrar', CadastrarUsuario);
    api.post('/user/login', LoginUsuario);
    api.post('/fazenda/cadastrarInicioColeta', CadastroInicioColeta);
    api.post('/fazenda/cadastrarDadosColeta', CadastroDadosColeta);

    // PATCHs
    api.patch('/fazenda/finalizarColeta', FinalizaColetaIniciada);


}

export { routesInitialize };