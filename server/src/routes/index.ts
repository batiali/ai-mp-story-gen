import express, { Router } from "express";
import userRoutes from "./userRoutes";
import storyRoutes from "./storyRoutes";
import storyBeatRoutes from "./storyBeatRoutes";
import voteRoutes from "./voteRoutes";

const router: Router = express.Router();

// API routes
router.use("/api/users", userRoutes);
router.use("/api/stories", storyRoutes);
router.use("/api/story-beats", storyBeatRoutes);
router.use("/api/votes", voteRoutes);

export default router;
