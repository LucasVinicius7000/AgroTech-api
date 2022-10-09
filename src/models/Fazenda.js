import db from '../../database/db.js';
import { Sequelize, DataTypes, Model } from 'sequelize';

const Fazenda =  db.define('Fazenda', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    nomeFazenda: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idUser: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    }

}, { tableName: 'Fazendas', timestamps: false });




export default Fazenda;