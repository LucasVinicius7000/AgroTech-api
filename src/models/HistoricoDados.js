import db from '../../database/db.js';
import { Sequelize } from 'sequelize';


const HistoricoDados = db.define('HistoricoDados', {

    Id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    TemperaturaAmbiente: {
        type: Sequelize.DOUBLE,
        allowNull: true,
    },
    UmidadeDoAr: {
        type: Sequelize.DOUBLE,
        allowNull: true,
    },
    UmidadeDoSolo: {
        type: Sequelize.DOUBLE,
        allowNull: true,
    },
    IdFazenda: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },


}, { tableName: 'HistoricosDados'});


export default HistoricoDados;