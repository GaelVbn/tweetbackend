import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/userRoutes.js";
import tweetRoutes from "./routes/tweetRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { authenticateToken } from "./middlewares/authMiddlewares.js";

const app = express();
app.use(express.json());

app.use("/users", authenticateToken, userRoutes);
app.use("/tweets", authenticateToken, tweetRoutes);
app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
