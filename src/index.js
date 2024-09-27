import express from "express";
import userRoutes from "./routes/userRoutes.js";
import tweetRoutes from "./routes/tweetRoutes.js";

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(tweetRoutes);

app.use("/users", userRoutes);
app.use("/tweets", tweetRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
