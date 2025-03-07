import express, { Router } from "express";
import { voteController } from "../controllers";

const router: Router = express.Router();

// POST submit a vote
router.post("/", voteController.submitVote);

// GET votes for a beat
router.get("/beat/:beatId", voteController.getVotesForBeat);

// GET user's vote for a beat
router.get("/user/:userId/beat/:beatId", voteController.getUserVoteForBeat);

export default router;
