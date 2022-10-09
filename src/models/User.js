import db from '../../database/db.js';
import { Sequelize, DataTypes, Model } from 'sequelize';
import Fazenda from '../models/Fazenda.js';

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, { tableName: 'Users', timestamps: false });

User.hasMany(Fazenda, { sourceKey: 'id', foreignKey: 'idUser'});

export default User;


