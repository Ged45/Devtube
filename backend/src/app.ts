import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/error.middleware.js";

import { healthRouter } from "./routes/health.route.js";
import { authRouter } from "./routes/auth.routes.js";
import { videoRouter } from "./routes/video.routes.js";

const app = express();

app.use(helmet());

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/videos", videoRouter);
app.use(errorHandler);

export default app;