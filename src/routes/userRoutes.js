import { Router } from "express";

const router = Router();

// user CRUD

// Ceate User
router.post("/", (req, res) => {
  res.status(501).json({ message: "Not Implemented" });
});

// list User
router.get("/", (req, res) => {
  res.status(501).json({ message: "Not Implemented" });
});

// Get One User
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ message: "Not Implemented", id });
});

// update User
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ message: "Not Implemented", id });
});

// delete User
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ message: "Not Implemented", id });
});

export default router;
