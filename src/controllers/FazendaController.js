import Coleta from '../models/Coleta.js';
import DadosColeta from '../models/DadosColeta.js';


/* 
    Playload base pra testar esse método

    Exemplo: 
    {
        "idFazenda": "1", --> [Esse idFazenda precisa obrigatóriamente ser uma fazenda que já existe no banco, do contrário não irá cadastrar devido as restrições de chave estrangeira]
        "umidadeAr":[12,13,14], --> [Esse é o array com cada um dos valores de umidade do ar coletados no intervalo de tempo da coleta]
        "umidadeSolo": [14,18,13.5], --> [Esse é o array com cada um dos valores de umidade do solo coletados no intervalo de tempo da coleta]
        "temperaturaAmbiente": [25,26,32], --> [Esse é o array com cada um dos valores de temperatura ambiente coletados no intervalo de tempo da coleta]
        "startedAt": "2022-10-12T17:25:46Z", --> [Data e hora de início da coleta]
        "finishedAt": "2022-10-12T17:25:46Z", --> [Data e hora do fim da coleta]
        "quantidadeDados": 3, --> [Quantidade de vezes que o arduíno coletou no intervalo de tempo da coleta]
        "titulo": "Qualquer coisa" --> [Um título opcional (permite nulo) para identifcar a coletaa]
    }

*/

async function CadastrarColetaCompleta(req, res) {

    const {
        idFazenda,
        umidadeAr,
        umidadeSolo,
        temperaturaAmbiente,
        startedAt,
        finishedAt,
        quantidadeDados,
        titulo,
    } = req.body;

    let idColeta, coleta, dados = [];

    // Validação pendente


    await Coleta.create({
        IdFazenda: idFazenda,
        Titulo: titulo,
        StartedAt: startedAt,
        FinishedAt: finishedAt,
    })
        .then((result) => {
            coleta = result.dataValues;
            idColeta = result.getDataValue('Id');
        }).catch((error) => {
            res.json({
                erro: true,
                mensagem: "Ocorreu um erro cadastrar a coleta de dados. " + error,
                data: { coleta }
            });
        });


    for (let count = 0; count < quantidadeDados; count++) {

        await DadosColeta.create({
            IdColeta: idColeta,
            TemperaturaAmbiente: temperaturaAmbiente[count],
            UmidadeDoAr: umidadeAr[count],
            UmidadeDoSolo: umidadeSolo[count],

        }).then((result) => {
            dados.push(result.dataValues);
        }).catch((error) => {
            res.json({
                erro: true,
                mensagem: "Ocorreu um erro cadastrar os dados coletados. " + error,
                data: { dados }
            });
        });
    }

    coleta.dados = dados;

    res.json({
        erro: false,
        mensagem: "Coleta cadastrada com sucesso.",
        data: { coleta }
    });

}

// async function CadastrarColetaRealTime(req, res) {

//     const {
//         idFazenda,
//         idColeta,
//         umidadeAr,
//         umidadeSolo,
//         temperaturaAmbiente,
//         startedAt,
//         finishedAt,
//         quantidadeDados,
//     } = req.body;

// }

export { CadastrarColetaCompleta };