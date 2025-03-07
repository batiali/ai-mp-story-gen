import { Request, Response } from "express";
import { Vote, Choice, StoryBeat, Story } from "../models";
import mongoose from "mongoose";

// Submit a vote
export const submitVote = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { userId, choiceId, storyId, beatId } = req.body;

        // Check if story exists and is active
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        if (!story.isActive) {
            return res.status(400).json({ message: "Cannot vote on an inactive story" });
        }

        // Check if beat exists and is the current beat
        const beat = await StoryBeat.findById(beatId);
        if (!beat) {
            return res.status(404).json({ message: "Story beat not found" });
        }

        if (beat.beatNumber !== story.currentBeat) {
            return res.status(400).json({ message: "Can only vote on the current beat" });
        }

        // Check if choice exists and belongs to the beat
        const choice = await Choice.findById(choiceId);
        if (!choice) {
            return res.status(404).json({ message: "Choice not found" });
        }

        const choiceBelongsToBeat = beat.choices.some((c) => c.toString() === choiceId);
        if (!choiceBelongsToBeat) {
            return res
                .status(400)
                .json({ message: "Choice does not belong to this beat" });
        }

        // Check if user has already voted on this beat
        const existingVote = await Vote.findOne({ userId, beatId });

        if (existingVote) {
            // If voting for the same choice, return success
            if (existingVote.choiceId.toString() === choiceId) {
                return res.status(200).json({ message: "Vote already submitted" });
            }

            // If voting for a different choice, update the vote
            // First, decrement the vote count on the old choice
            await Choice.findByIdAndUpdate(
                existingVote.choiceId,
                {
                    $inc: { votes: -1 },
                    $pull: { voters: userId },
                },
                { session }
            );

            // Update the existing vote
            existingVote.choiceId = new mongoose.Types.ObjectId(choiceId);
            await existingVote.save({ session });

            // Increment the vote count on the new choice
            await Choice.findByIdAndUpdate(
                choiceId,
                {
                    $inc: { votes: 1 },
                    $addToSet: { voters: userId },
                },
                { session }
            );

            await session.commitTransaction();

            return res.status(200).json({ message: "Vote updated successfully" });
        } else {
            // Create a new vote
            const newVote = new Vote({
                userId,
                choiceId,
                storyId,
                beatId,
                timestamp: new Date(),
            });

            await newVote.save({ session });

            // Increment the vote count on the choice
            await Choice.findByIdAndUpdate(
                choiceId,
                {
                    $inc: { votes: 1 },
                    $addToSet: { voters: userId },
                },
                { session }
            );

            await session.commitTransaction();

            return res.status(201).json({ message: "Vote submitted successfully" });
        }
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: "Error submitting vote", error });
    } finally {
        session.endSession();
    }
};

// Get votes for a beat
export const getVotesForBeat = async (req: Request, res: Response) => {
    try {
        const { beatId } = req.params;

        const beat = await StoryBeat.findById(beatId).populate({
            path: "choices",
            select: "content votes voters",
        });

        if (!beat) {
            return res.status(404).json({ message: "Story beat not found" });
        }

        res.status(200).json(beat.choices);
    } catch (error) {
        res.status(500).json({ message: "Error fetching votes", error });
    }
};

// Get user's vote for a beat
export const getUserVoteForBeat = async (req: Request, res: Response) => {
    try {
        const { userId, beatId } = req.params;

        const vote = await Vote.findOne({ userId, beatId }).populate(
            "choiceId",
            "content"
        );

        if (!vote) {
            return res.status(404).json({ message: "Vote not found" });
        }

        res.status(200).json(vote);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user vote", error });
    }
};
