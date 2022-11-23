import Coleta from "../models/Coleta.js";
import DadosColeta from "../models/DadosColeta.js";
import Fazenda from "../models/Fazenda.js";
import { Op } from "sequelize";

async function CadastroInicioColeta(req, res) {
  const { idFazenda } = req.body;

  let coleta,
    startedAt = new Date();

  try {
    await Coleta.create({
      IdFazenda: idFazenda,
      StartedAt: startedAt,
    })
      .then((result) => {
        coleta = result.dataValues;

        res.status(201).send({
          erro: false,
          mensagem: "Coleta iniciada cadastrada com sucesso.",
          data: coleta,
        });
      })
      .catch((error) => {
        res.status(500).send({
          erro: true,
          mensagem: error,
          data: coleta,
        });
      });
  } catch (error) {
    res.status(500).send({
      erro: true,
      mensagem: "Erro ao cadastrar coleta iniciada.",
      data: coleta,
    });
  }
}

async function CadastroDadosColeta(req, res) {
  const { idColeta, umidadeAr, umidadeSolo, temperaturaAmbiente, createdAt } =
    req.body;

  let dadosCadastrados;

  await DadosColeta.create({
    IdColeta: idColeta,
    UmidadeDoAr: umidadeAr,
    UmidadeDoSolo: umidadeSolo,
    TemperaturaAmbiente: temperaturaAmbiente,
  })
    .then((result) => {
      (dadosCadastrados = result.dataValues),
        res.status(201).send({
          erro: false,
          mensagem: "Os dados coletados foram cadastrados com sucesso.",
          data: dadosCadastrados,
        });
    })
    .catch((error) => {
      res.status(500).send({
        erro: true,
        mensagem: "Erro ao cadastrar dados coletados. " + error,
        data: dadosCadastrados,
      });
    });
}

async function FinalizaColetaIniciada(req, res) {
  const { idColeta } = req.body;

  try {
    let resultUpdate = await Coleta.update(
      { FinishedAt: new Date() },
      {
        where: {
          Id: idColeta,
        },
      }
    )
      .then((result) => {
        if (result[0] >= 1) {
          console.log(result[0] + " linhas afetadas.");

          res.status(204).send({
            erro: false,
            mensagem: "Coleta finalizada com sucesso.",
          });
        } else {
          res.status(500).send({
            erro: true,
            mensagem: "Erro ao finalizar coleta.",
            data: resultUpdate,
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          erro: true,
          mensagem: error,
          data: resultUpdate,
        });
      });
  } catch (error) {
    res.status(500).send({
      erro: true,
      mensagem: "Erro ao finalizar coleta.",
    });
  }
}

async function ListAllColetasByIdUser(req, res) {
  let listColetas, dadosColeta;
  const { fazendaId } = req.query;

  listColetas = await Coleta.findAll({
    where: {
      IdFazenda: fazendaId,
      [Op.and]: {
        FinishedAt: {
          [Op.not]: null,
        },
      },
    },
  });

  listColetas = JSON.parse(JSON.stringify(listColetas));

  for (const coleta in listColetas) {
    listColetas[coleta].Dados = await DadosColeta.findAll({
      where: { IdColeta: listColetas[coleta].Id },
    });
  }

  if(listColetas != null && listColetas[0].Dados != null){
    res.status(200).send({
      erro: false,
      mensagem: "Coletas listadas com sucesso.",
      data: listColetas,
    });
  }

  res.status(500).send({
    erro: true,
    mensagem: "Erro ao listar coletas.",
    data: listColetas,
  });

  
}

async function GetFazendaByUserId(req, res) {
  const { userId } = req.query;
  let fazenda;

  try {
    fazenda = await Fazenda.findOne({ where: { IdUser: userId } });

    if (fazenda != null) {
      res.status(200).send({
        erro: false,
        mensagem: "Fazenda recuperada com sucesso.",
        data: fazenda,
      });
    }
  } catch (error) {
    res.status(401).send({
      erro: true,
      mensagem: "Erro ao buscar fazenda associada ao usuário.",
      data: fazenda,
    });
  }
}

export {
  CadastroInicioColeta,
  GetFazendaByUserId,
  FinalizaColetaIniciada,
  CadastroDadosColeta,
  ListAllColetasByIdUser,
};
