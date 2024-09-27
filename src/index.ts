import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes.js";
import tweetRoutes from "./routes/tweetRoutes.js";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/tweets", tweetRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
