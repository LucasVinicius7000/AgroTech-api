import User from "../models/User.js";
import Fazenda from "../models/Fazenda.js";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv";

async function ListarUsuarios(req, res) {
  const users = await User.findAll();

  if (users) {
    res.json({
      erro: false,
      mensagem: "Usuários listados com sucesso.",
      data: users,
    });
  } else {
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
      idUser = result.getDataValue("Id");
    })
    .catch((error) => {
      res.status(500).send({
        erro: true,
        mensagem: "Ocorreu um erro cadastrar o usuário. " + error,
        data: { usuario, fazenda },
      });
    });

  await Fazenda.create({
    NomeFazenda: nomeFazenda,
    IdUser: idUser,
  })
    .then((result) => {
      fazenda = result.dataValues;
    })
    .catch((error) => {
      res.status(500).send({
        erro: true,
        mensagem: "Ocorreu um erro cadastrar o usuário. " + error,
        data: { usuario, fazenda },
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

async function LoginUsuario(req, res) {
  const { email, password } = req.body;
  let foundUser;

  try {
    foundUser = await User.findOne({ where: { Email: email } });

    if (foundUser != null) {
      if (compareSync(password, foundUser?.dataValues.Password)) {
        let data = {
          time: new Date(),
          userId: foundUser?.dataValues.Id,
        };

        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(data, secretKey);

        res.cookie("AgroTechAuthorization", token, {
          maxAge: 86400000,
          sameSite: "none",
          httpOny: false,
          secure: true,
        });
        res.status(200).send({
          erro: false,
          mensagem: "Usuário logado com sucesso.",
          data: foundUser?.dataValues,
        });
      }
    } else
      throw new Error(
        "Impossível realizar login, as informações enviadas não correspondem a nenhum usuário cadastrado."
      );
  } catch (error) {
    res.status(500).send({
      erro: true,
      mensagem: "Usuário não encontrado na base de dados. " + error,
      data: foundUser,
    });

    console.log("Usuário não encontrado na base de dados. " + error);
  }
}

async function IsLogged(req, res) {
  let cookies = req.get("Cookie");
  const token = cookies.split("AgroTechAuthorization" + "=")[1];

  try {

    if (jwt.verify(token, process.env.JWT_SECRET_KEY)) {
      console.log("Token autenticado com sucesso.");
      res.status(200).send({
        erro: false,
        mensagem: "Token validado com sucesso.",
        data: {
          isValid: true,
        },
      });
    }

  } catch (error) {
    console.log("Token inválido.");
    res.status(401).send({
      erro: true,
      mensagem: "Token inválido.",
      data: {
        isValid: false,
      },
    });
  }
}

export { ListarUsuarios, CadastrarUsuario, LoginUsuario, IsLogged };
