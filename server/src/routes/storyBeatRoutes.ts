import express, { Router } from "express";
import { storyBeatController } from "../controllers";

const router: Router = express.Router();

// GET all beats for a story
router.get("/story/:storyId", storyBeatController.getStoryBeats);

// GET current beat for a story
router.get("/story/:storyId/current", storyBeatController.getCurrentBeat);

// GET specific beat
router.get("/:beatId", storyBeatController.getStoryBeat);

// POST create new beat (progress the story)
router.post("/", storyBeatController.createStoryBeat);

export default router;
