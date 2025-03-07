import { Request, Response } from "express";
import { StoryBeat, Story, Choice } from "../models";
import mongoose from "mongoose";

// Get all beats for a story
export const getStoryBeats = async (req: Request, res: Response) => {
    try {
        const { storyId } = req.params;

        const storyBeats = await StoryBeat.find({ storyId })
            .populate("choices")
            .sort({ beatNumber: 1 });

        res.status(200).json(storyBeats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching story beats", error });
    }
};

// Get a specific beat
export const getStoryBeat = async (req: Request, res: Response) => {
    try {
        const { beatId } = req.params;

        const storyBeat = await StoryBeat.findById(beatId).populate("choices");

        if (!storyBeat) {
            return res.status(404).json({ message: "Story beat not found" });
        }

        res.status(200).json(storyBeat);
    } catch (error) {
        res.status(500).json({ message: "Error fetching story beat", error });
    }
};

// Get current beat for a story
export const getCurrentBeat = async (req: Request, res: Response) => {
    try {
        const { storyId } = req.params;

        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        const currentBeat = await StoryBeat.findOne({
            storyId,
            beatNumber: story.currentBeat,
        }).populate("choices");

        if (!currentBeat) {
            return res.status(404).json({ message: "Current beat not found" });
        }

        res.status(200).json(currentBeat);
    } catch (error) {
        res.status(500).json({ message: "Error fetching current beat", error });
    }
};

// Create a new story beat (progress the story)
export const createStoryBeat = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { storyId, content, choiceOptions } = req.body;

        // Find the story
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        // Check if story has reached max beats
        if (story.currentBeat >= story.maxBeats) {
            return res
                .status(400)
                .json({ message: "Story has reached maximum number of beats" });
        }

        // Create choices
        const choiceIds = [];

        if (choiceOptions && choiceOptions.length > 0) {
            for (const option of choiceOptions) {
                const newChoice = new Choice({
                    content: option,
                    votes: 0,
                    voters: [],
                });

                const savedChoice = await newChoice.save({ session });
                choiceIds.push(savedChoice._id);
            }
        }

        // Create the new beat
        const newBeatNumber = story.currentBeat + 1;

        const newBeat = new StoryBeat({
            storyId,
            content,
            beatNumber: newBeatNumber,
            choices: choiceIds,
        });

        const savedBeat = await newBeat.save({ session });

        // Update the story's current beat
        await Story.findByIdAndUpdate(
            storyId,
            {
                currentBeat: newBeatNumber,
                isActive: newBeatNumber < story.maxBeats,
            },
            { session }
        );

        await session.commitTransaction();

        // Populate the choices in the response
        const populatedBeat = await StoryBeat.findById(savedBeat._id).populate("choices");

        res.status(201).json(populatedBeat);
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: "Error creating story beat", error });
    } finally {
        session.endSession();
    }
};
