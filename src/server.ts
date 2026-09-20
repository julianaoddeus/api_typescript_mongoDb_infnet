import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const port: number = 3000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) throw new Error("MONGO_URI não configurada.");

mongoose.connect(mongoUri).then(() => {
  console.log("Conectado ao MongoDB");
  app.listen(port, () => {
    console.log(`Serviço executando na porta ${port}`);
  });
});
