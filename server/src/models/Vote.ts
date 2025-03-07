import mongoose, { Document, Schema } from "mongoose";

const VoteSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        choiceId: {
            type: Schema.Types.ObjectId,
            ref: "Choice",
            required: true,
        },
        storyId: {
            type: Schema.Types.ObjectId,
            ref: "Story",
            required: true,
        },
        beatId: {
            type: Schema.Types.ObjectId,
            ref: "StoryBeat",
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Create a compound index to ensure a user can only vote once per choice
VoteSchema.index({ userId: 1, beatId: 1 }, { unique: true });

export default mongoose.model("Vote", VoteSchema);
