import express from "express";
import type { Express } from "express";
import { logger } from "./middlewares/logger.middleware.js";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/tsoa.routes.js";
import { createRequire } from "module";
import { errorHandler } from "./middlewares/error.middleware.js";

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger.json");

const app: Express = express();

app.use(express.json());
app.use(logger);

// Rotas geradas pelo tsoa
RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;
