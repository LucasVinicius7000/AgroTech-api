import db from '../../database/db.js';
import { Sequelize, DataTypes, Model } from 'sequelize';
import HistoricoDados from '../models/HistoricoDados.js';

const Fazenda = db.define('Fazenda', {
    Id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    NomeFazenda: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    IdUser: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    }

}, { tableName: 'Fazendas', timestamps: false });


export default Fazenda;