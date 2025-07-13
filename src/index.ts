import express from "express";
import healthRouter from "./routes/health.router";
import userRouter from "./routes/user.route";
import gameRoutes from "./routes/game.router";
import authRoute from "./routes/auth.router";
import swapRoute from "./routes/swap.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.config";

const app = express();
const PORT = process.env.PORT || 5500;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use("/api/health", healthRouter);
app.use("/api/auth", authRoute);
app.use("/api/games", gameRoutes);
app.use("/api/user", userRouter);
app.use("/api/swaps", swapRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
