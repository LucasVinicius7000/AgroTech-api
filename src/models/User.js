import db from '../../database/db.js';
import { Sequelize, DataTypes, Model } from 'sequelize';
import Fazenda from '../models/Fazenda.js';

const User = db.define('User', {
    Id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    Nome: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, { tableName: 'Users', timestamps: false });

export default User;


