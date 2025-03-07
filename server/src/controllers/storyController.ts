import { Request, Response } from "express";
import { Story, StoryBeat } from "../models";
import mongoose from "mongoose";
import { CreateStoryRequest, UpdateStoryRequest } from "../types";

// Get all stories
export const getStories = async (req: Request, res: Response) => {
    try {
        const stories = await Story.find()
            .populate("createdBy", "username avatarUrl")
            .sort({ createdAt: -1 });

        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching stories", error });
    }
};

// Get active stories
export const getActiveStories = async (req: Request, res: Response) => {
    try {
        const stories = await Story.find({ isActive: true })
            .populate("createdBy", "username avatarUrl")
            .sort({ createdAt: -1 });

        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching active stories", error });
    }
};

// Get story by ID
export const getStoryById = async (req: Request, res: Response) => {
    try {
        const story = await Story.findById(req.params.id).populate(
            "createdBy",
            "username avatarUrl"
        );

        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        res.status(200).json(story);
    } catch (error) {
        res.status(500).json({ message: "Error fetching story", error });
    }
};

// Create new story
export const createStory = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { title, description, maxBeats, userId }: CreateStoryRequest = req.body;

        // Create the story
        const newStory = new Story({
            title,
            description,
            createdBy: userId,
            maxBeats,
            currentBeat: 0,
            isActive: true,
        });

        const savedStory = await newStory.save({ session });

        // Create the initial story beat (can be implemented later with OpenAI)
        // This is a placeholder for now
        const initialBeat = new StoryBeat({
            storyId: savedStory._id,
            content: "The story begins...",
            beatNumber: 0,
            choices: [],
        });

        await initialBeat.save({ session });

        await session.commitTransaction();

        // Populate and transform to StoryResponse format
        const populatedStory = await Story.findById(savedStory._id).populate(
            "createdBy",
            "username avatarUrl"
        );

        res.status(201).json(populatedStory);
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: "Error creating story", error });
    } finally {
        session.endSession();
    }
};

// Update story
export const updateStory = async (req: Request, res: Response) => {
    try {
        const { title, description, isActive }: UpdateStoryRequest = req.body;

        const updatedStory = await Story.findByIdAndUpdate(
            req.params.id,
            { title, description, isActive },
            { new: true, runValidators: true }
        ).populate("createdBy", "username avatarUrl");

        if (!updatedStory) {
            return res.status(404).json({ message: "Story not found" });
        }

        res.status(200).json(updatedStory);
    } catch (error) {
        res.status(500).json({ message: "Error updating story", error });
    }
};

// Delete story
export const deleteStory = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Delete the story
        const deletedStory = await Story.findByIdAndDelete(req.params.id, { session });

        if (!deletedStory) {
            return res.status(404).json({ message: "Story not found" });
        }

        // Delete all related story beats
        await StoryBeat.deleteMany({ storyId: req.params.id }, { session });

        await session.commitTransaction();

        res.status(200).json({ message: "Story deleted successfully" });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: "Error deleting story", error });
    } finally {
        session.endSession();
    }
};

// Delete all stories (admin only)
export const deleteAllStories = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Delete all stories
        await Story.deleteMany({}, { session });

        // Delete all related story beats
        await StoryBeat.deleteMany({}, { session });

        await session.commitTransaction();

        res.status(200).json({ message: "All stories deleted successfully" });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: "Error deleting all stories", error });
    } finally {
        session.endSession();
    }
};
