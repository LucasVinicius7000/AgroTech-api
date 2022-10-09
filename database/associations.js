import Fazenda from "../src/models/Fazenda.js";
import User from "../src/models/User.js";
import HistoricoDados from "../src/models/HistoricoDados.js";


export default function setAssociations() {

    // Um usuário tem UMA ou MUITAS fazendas.
    User.hasMany(Fazenda, { sourceKey:'Id', foreignKey:'IdUser'});

    // Um histórico de dados pertence a UMA fazenda.
    Fazenda.hasMany(HistoricoDados, { sourceKey:'Id', foreignKey: 'IdFazenda'});

}