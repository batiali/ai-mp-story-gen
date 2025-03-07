import { Request, Response } from "express";
import { Choice, Story, StoryBeat } from "../models";
import mongoose from "mongoose";
import {
    CreateStoryRequest,
    CreateStoryResponse,
    DeleteAllStoriesRequest,
    DeleteAllStoriesResponse,
    DeleteStoryRequest,
    DeleteStoryResponse,
    GetAllStoriesRequest,
    GetAllStoriesResponse,
    GetStoryByIdRequest,
    GetStoryByIdResponse,
    UpdateStoryRequest,
    UpdateStoryResponse,
} from "../types/story.types";

// Get all stories
export const getStories = async (
    req: GetAllStoriesRequest,
    res: GetAllStoriesResponse
) => {
    try {
        const stories = await Story.find()
            .populate("createdBy", "username avatarUrl")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: stories });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching stories" });
    }
};

// Get active stories
export const getActiveStories = async (
    req: GetAllStoriesRequest,
    res: GetAllStoriesResponse
) => {
    try {
        const stories = await Story.find({ isActive: true })
            .populate("createdBy", "username avatarUrl")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: stories });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching active stories" });
    }
};

// Get story by ID
export const getStoryById = async (
    req: GetStoryByIdRequest,
    res: GetStoryByIdResponse
) => {
    try {
        const story = await Story.findById(req.params.id).populate(
            "createdBy",
            "username avatarUrl"
        );

        if (!story) {
            return res.status(404).json({ success: false, error: "Story not found" });
        }

        res.status(200).json({ success: true, data: story });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching story" });
    }
};

// Create new story
export const createStory = async (req: CreateStoryRequest, res: CreateStoryResponse) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { title, description, maxBeats, userId } = req.body;

        const newStory = new Story({
            title,
            description,
            createdBy: userId,
            maxBeats,
            currentBeat: 0,
            isActive: true,
        });

        const savedStory = await newStory.save({ session });

        const choices = await Promise.all([
            new Choice({
                content: "Option 1",
                votes: 0,
                voters: [],
            }).save({ session }),
            new Choice({
                content: "Option 2",
                votes: 0,
                voters: [],
            }).save({ session }),
        ]);

        const initialBeat = new StoryBeat({
            storyId: savedStory._id,
            content: "The story begins...",
            beatNumber: 0,
            choices: choices.map((choice) => choice._id),
        });

        await initialBeat.save({ session });

        await session.commitTransaction();

        const populatedStory = await Story.findById(savedStory._id).populate(
            "createdBy",
            "username avatarUrl"
        );

        if (!populatedStory) {
            return res.status(404).json({ success: false, error: "Story not found" });
        }

        res.status(201).json({ success: true, data: populatedStory });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({
            success: false,
            error: "Error creating story: " + (error as Error).message,
        });
    } finally {
        session.endSession();
    }
};

// Update story
export const updateStory = async (req: UpdateStoryRequest, res: UpdateStoryResponse) => {
    try {
        const { title, description, isActive } = req.body;

        const updatedStory = await Story.findByIdAndUpdate(
            req.params.id,
            { title, description, isActive },
            { new: true, runValidators: true }
        ).populate("createdBy", "username avatarUrl");

        if (!updatedStory) {
            return res.status(404).json({ success: false, error: "Story not found" });
        }

        res.status(200).json({ success: true, data: updatedStory });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating story" });
    }
};

// Delete story
export const deleteStory = async (req: DeleteStoryRequest, res: DeleteStoryResponse) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Delete the story
        const deletedStory = await Story.findByIdAndDelete(req.params.id, { session });

        if (!deletedStory) {
            return res.status(404).json({ success: false, error: "Story not found" });
        }

        // Delete all related story beats
        await StoryBeat.deleteMany({ storyId: req.params.id }, { session });

        await session.commitTransaction();

        res.status(200).json({ success: true, data: deletedStory });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ success: false, error: "Error deleting story" });
    } finally {
        session.endSession();
    }
};

// Delete all stories (admin only)
export const deleteAllStories = async (
    req: DeleteAllStoriesRequest,
    res: DeleteAllStoriesResponse
) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Delete all stories
        const deletedStories = await Story.deleteMany({}, { session });

        // Delete all related story beats
        await StoryBeat.deleteMany({}, { session });

        await session.commitTransaction();

        if (!deletedStories) {
            return res.status(404).json({ success: false, error: "Stories not found" });
        }

        res.status(200).json({
            success: true,
            data: { count: deletedStories.deletedCount },
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ success: false, error: "Error deleting all stories" });
    } finally {
        session.endSession();
    }
};
