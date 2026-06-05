import {sequelize} from "sequelize";
import {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_DIALECT} from "../config/config.js";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;