import User from '../models/User.js';

async function ListarUsuarios(req, res) {

    try {
        const users = await User.findAll();
        console.log("Usuários listados com sucesso.");
        res.json(users);
    } catch (error) {
        console.log("Falha ao listar os usuários.");
        throw new Error(error);
    }
}

async function CadastrarUsuario(req, res) {
    console.log(req.body);
    res.json("...");
    //const { nome, email, password } = req.body;
    // try {
    //     if (nome != null && email != null && password != null) {

    //     }
    //     else {
    //         throw new Error("Dados do usuário inválidos.");
    //     }
    //     console.log(nome, email, password);
    // } catch (error) {
    //     console.log(error);
    // }
}


export { ListarUsuarios, CadastrarUsuario };