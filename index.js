import express from "express";
import router from "./routes/router.js";
import { notFound } from "./middlewares/notFound.js";
import {SERVER_PORT} from "./config/config.js";
import sequelize from "./connection/sequelize.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

await sequelize.sync({ alter: false})

app.use(notFound)

app.listen(SERVER_PORT, () => {
  console.log(`🚀 ~ server ok on port http://localhost:${SERVER_PORT}`);
});