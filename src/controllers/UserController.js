import User from '../models/User.js';
import Fazenda from '../models/Fazenda.js';

async function ListarUsuarios(req, res) {


    const users = await User.findAll();

    if (users) {
        res.json({
            erro: false,
            mensagem: "Usuários listados com sucesso.",
            data: users,
        });
    }
    else {
        res.json({
            erro: true,
            mensagem: "Falha ao listar os usuários.",
            data: users,
        });
    }


}

async function CadastrarUsuario(req, res) {

    const { nome, email, password, nomeFazenda } = req.body;
    let idUser, usuario, fazenda;


    await User.create({
        nome: nome,
        email: email,
        password: password,
    })
        .then((result) => {
            usuario = result.dataValues;
            idUser = result.getDataValue('id');
        }).catch((error) => {
            res.json({
                erro: true,
                mensagem: "Ocorreu um erro cadastrar o usuário." + error,
                data: { usuario, fazenda }
            });
        });

    await Fazenda.create({
        nomeFazenda: nomeFazenda,
        idUser: idUser,
    })
        .then((result) => {
            fazenda = result.dataValues;
        }).catch((error) => {
            res.json({
                erro: true,
                mensagem: "Ocorreu um erro cadastrar o usuário." + error,
                data: { usuario, fazenda }
            });
        });

        
    if (usuario && fazenda) {
        res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso.",
            data: { usuario, fazenda },
        });
    }


}


export { ListarUsuarios, CadastrarUsuario };