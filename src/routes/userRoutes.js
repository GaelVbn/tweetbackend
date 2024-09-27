import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// user CRUD

// Ceate User
router.post("/", async (req, res) => {
  const { email, name, Username } = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        Username,
        bio: "Hello, my name is " + name,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "username and email should be unique" });
  }
});

// curl -X POST -H "Content-Type: application/json" -d '{"email": "l7YQr@example.com", "name": "John", "Username": "john123"}' http://localhost:3000/users

// list User
router.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

// Get One User
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  res.json(user);
});

// update User
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { bio, image, name } = req.body;

  try {
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: { bio, image, name },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Failed to update the user" });
  }
});

// delete User
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id: Number(id) },
  });
  res.status(200).json({ message: "User deleted successfully" });
});

export default router;
