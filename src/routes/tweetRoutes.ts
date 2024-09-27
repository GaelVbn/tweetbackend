import { Router } from "express";

const router = Router();

// tweet CRUD

// Ceate tweet
router.post("/", (req, res) => {
  res.status(501).json({ message: "Not Implemented" });
});

// list tweet
router.get("/", (req, res) => {
  res.status(501).json({ message: "Not Implemented" });
});

// Get One tweet
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ message: "Not Implemented", id });
});

// update tweet
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ message: "Not Implemented", id });
});

// delete tweet
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ message: "Not Implemented", id });
});

export default router;
