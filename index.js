import express from "express";
import router from "./routes/router.js";
import { notFound } from "./midlewares/notFound.js";
import {SERVER_PORT} from "./config/config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(notFound)

app.listen(SERVER_PORT, () => {
  console.log(`🚀 ~ server ok on port http://localhost:${SERVER_PORT}`);
});