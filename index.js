import express from "express";
import router from "./routes/router.js";
import { notFound } from "./middlewares/notFound.js";
import {SERVER_PORT} from "./config/config.js";
import sequelize from "./connection/sequelize.js";
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
   origin: 'http://localhost:5173',
   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization']
 }))

app.use(router);

await sequelize.sync({ alter: false})

app.use(notFound)

app.listen(SERVER_PORT, () => {
  console.log(`🚀 ~ server ok on port http://localhost:${SERVER_PORT}`);
});