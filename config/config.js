import{env} from "node:process";

const SERVER_PORT = env.SERVER_PORT;
const DB_HOST = env.DB_HOST;
const DB_USER = env.DB_USER;
const DB_PASSWORD = env.DB_PASSWORD || "";
const DB_NAME = env.DB_NAME;
const DB_PORT = env.DB_PORT;
const DB_DIALECT = env.DB_DIALECT;
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