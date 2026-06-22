import{env} from "node:process";

const SERVER_PORT = env.SERVER_PORT || "8080";
const DB_HOST = env.DB_HOST || "localhost";
const DB_USER = env.DB_USER || "root";
const DB_PASSWORD = env.DB_PASSWORD || "";
const DB_NAME = env.DB_NAME || "tp2_tpfinal";
const DB_PORT = env.DB_PORT || "3306";
const DB_DIALECT = env.DB_DIALECT || "mysql";
const SECRET = env.SECRET

export {
    SERVER_PORT,
    DB_HOST,
    DB_USER,   
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    DB_DIALECT,
    SECRET
}