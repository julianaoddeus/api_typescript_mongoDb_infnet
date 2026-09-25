import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
  const url = process.env.MONGODB_URL || "localhost";
  const port = process.env.MONGODB_PORT || "27017";
  const dbName = process.env.MONGODB_DATABASE;

  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) throw new Error("MONGO_URI não configurada.");

    await mongoose.connect(uri);

    console.log(`MongoDB ${url}:${port} conectado ao banco ${dbName}`);
  } catch (err) {
    console.error("Erro ao conectar no MongoDB", err);
    process.exit(1);
  }
};
