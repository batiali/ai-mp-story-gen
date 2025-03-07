import mongoose, { Document, Schema } from "mongoose";

const StoryBeatSchema = new Schema(
    {
        storyId: {
            type: Schema.Types.ObjectId,
            ref: "Story",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        choices: [
            {
                type: Schema.Types.ObjectId,
                ref: "Choice",
            },
        ],
        beatNumber: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("StoryBeat", StoryBeatSchema);
