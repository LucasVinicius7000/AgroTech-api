import Fazenda from "../src/models/Fazenda.js";
import User from "../src/models/User.js";
import DadosColeta from "../src/models/DadosColeta.js";
import Coleta from "../src/models/Coleta.js";


export default function setAssociations() {

    // Um Usuário tem UMA ou MUITAS Fazendas.
    User.hasMany(Fazenda, { sourceKey:'Id', foreignKey:'IdUser'});

    // Uma Fazenda tem UMA ou MUITAS Coletas De Dados.
    Fazenda.hasMany(Coleta, { sourceKey:'Id', foreignKey: 'IdFazenda'});

    // Uma Coleta De Dados tem UM ou MUITOS Dados De Coleta.
    Coleta.hasMany(DadosColeta, { sourceKey: 'Id', foreignKey: 'IdColeta'})

}