import { Sequelize } from "sequelize"; // importar o sequelize

const dbName = 'AgroTech';
const dbUser = 'LucasUser';
const dbHost = 'localhost';
const dbPassword = '0147';


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'mssql',
    dialectOptions: {
        options: {
            useUTC: false,
            dateFirst: 1
        }
    },
    host: dbHost,
    port:1433,
});


export default sequelize;