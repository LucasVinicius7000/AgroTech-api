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
    IdColeta: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    }


}, { tableName: 'DadosColeta', timestamps: false });


export default DadosColeta;