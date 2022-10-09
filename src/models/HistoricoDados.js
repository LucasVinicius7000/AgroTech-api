import db from '../../database/db.js';
import { Sequelize, DataTypes, Model } from 'sequelize';

const HistoricoDados = db.define('HistoricoDados', {

    Id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true, 
        allowNull: false,
        autoIncrement: true,
    },
    TemperaturaAmbiente: {

    },
    UmidadeDoAr: {

    },
    UmidadeDoSolo: {
        
    }
    

}, { tableName: 'HistoricosDados' });