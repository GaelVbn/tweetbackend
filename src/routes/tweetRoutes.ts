import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// tweet CRUD

// Ceate tweet
router.post("/", async (req, res) => {
  const { content, image, userId } = req.body;
  try {
    const result = await prisma.tweet.create({
      data: {
        content,
        image,
        userId, // manage based on the auth user
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Failed to create tweet" });
  }
});

// list tweet
router.get("/", async (req, res) => {
  const AllTweet = await prisma.tweet.findMany();
  res.json(AllTweet);
});

// Get One tweet
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await prisma.tweet.findUnique({
    where: { id: Number(id) },
  });
  if (!tweet) {
    res.status(404).json({ error: "Tweet not found" });
  } else {
    res.json(tweet);
  }
});

// update tweet
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const result = await prisma.tweet.update({
    where: { id: Number(id) },
    data: { content },
  });
  if (!result) {
    res.status(404).json({ error: "Tweet not found" });
  } else {
    res.json(result);
  }
});

// delete tweet
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.tweet.delete({
    where: { id: Number(id) },
  });
  res.sendStatus(200);
});

export default router;
