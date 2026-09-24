import { Schema } from "mongoose";
import { ICourse } from "../models/courses.model.js";

export const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: [true, "Nome do curso é obrigatório."],
      trim: true,
      minLength: [5, "Nome deve ter pelo menos 5 caracteres."],
      maxLength: [150, "Nome do curso deve ter no máximo 150 caracteres."],
    },
    description: {
      type: String,
      required: [true, "Descrição do curso é obrigatória."],
      trim: true,
      minLength: [10, "Descrição deve ter pelo menos 10 caracteres."],
      maxLength: [150, "Descrição do curso deve ter no máximo 150 caracteres."],
    },
    stock: {
      type: Number,
      required: [true, "Quantidade de vagas é obrigatório."],
      min: [1, "Quantidade deve ter pelo menos 1."],
    },
    startDate: {
      type: Date,
      required: [true, "Data de início é obrigatória."],
    },
    imageURL: {
      type: String,
      required: [true, "Imagem para capa do curso é obrigatória."],
    },
  }
);


courseSchema.index({ name: 1 });