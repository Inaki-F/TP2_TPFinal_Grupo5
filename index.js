import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/router.js";
import { notFound } from "./middlewares/notFound.js";
import { SERVER_PORT } from "./config/config.js";
import sequelize from "./connection/sequelize.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
   origin: 'http://localhost:5173',
   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use(router);

await sequelize.sync({ alter: false });

app.use(notFound);

app.listen(SERVER_PORT, () => {
  console.log(`🚀 ~ server ok on port http://localhost:${SERVER_PORT}`);
});