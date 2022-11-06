import User from '../models/User.js';
import Fazenda from '../models/Fazenda.js';
import bcrypt from 'bcrypt';

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

    // Validação pendente

    let idUser, usuario, fazenda, hashPass;
    hashPass = bcrypt.hashSync(password, 10);

    //compareSync()

    await User.create({
        Nome: nome,
        Email: email,
        Password: hashPass,
    })
        .then((result) => {
            usuario = result.dataValues;
            idUser = result.getDataValue('Id');
        }).catch((error) => {
            res.status(500).send({
                erro: true,
                mensagem: "Ocorreu um erro cadastrar o usuário. " + error,
                data: { usuario, fazenda }
            });
        });

    await Fazenda.create({
        NomeFazenda: nomeFazenda,
        IdUser: idUser,
    })
        .then((result) => {
            fazenda = result.dataValues;
        }).catch((error) => {
            res.status(500).send({
                erro: true,
                mensagem: "Ocorreu um erro cadastrar o usuário. " + error,
                data: { usuario, fazenda }
            });
        });


    if (usuario && fazenda) {
        res.status(201).send({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso.",
            data: { usuario, fazenda },
        });
    }


}


export { ListarUsuarios, CadastrarUsuario };