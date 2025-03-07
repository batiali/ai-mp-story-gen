import mongoose, { Document, Schema } from "mongoose";

export interface IVote extends Document {
    userId: mongoose.Types.ObjectId;
    choiceId: mongoose.Types.ObjectId;
    storyId: mongoose.Types.ObjectId;
    beatId: mongoose.Types.ObjectId;
    timestamp: Date;
}

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

const Vote = mongoose.model<IVote>("Vote", VoteSchema);
export default Vote;
