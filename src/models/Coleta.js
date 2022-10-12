import db from '../../database/db.js';
import { Sequelize, DataTypes } from 'sequelize';

const Coleta = db.define('Coleta', {

    Id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    IdFazenda: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },
    Titulo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    StartedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    FinishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }


}, { tableName: 'Coletas', timestamps: false });

export default Coleta;