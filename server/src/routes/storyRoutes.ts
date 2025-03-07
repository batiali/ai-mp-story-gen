import express, { Router } from "express";
import { storyController } from "../controllers";

const router: Router = express.Router();

// GET all stories
router.get("/", storyController.getStories);

// GET active stories
router.get("/active", storyController.getActiveStories);

// DELETE all stories (admin only)
router.delete("/all", storyController.deleteAllStories);

// GET story by ID
router.get("/:id", storyController.getStoryById);

// POST create new story
router.post("/", storyController.createStory);

// PUT update story
router.put("/:id", storyController.updateStory);

// DELETE story
router.delete("/:id", storyController.deleteStory);

export default router;
