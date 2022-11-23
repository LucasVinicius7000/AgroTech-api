import db from '../../database/db.js';
import { Sequelize } from 'sequelize';


const DadosColeta = db.define('DadosColeta', {

    Id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    TemperaturaAmbiente: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    UmidadeDoAr: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    UmidadeDoSolo: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    IdColeta: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    }


}, { tableName: 'DadosColeta' });


export default DadosColeta;