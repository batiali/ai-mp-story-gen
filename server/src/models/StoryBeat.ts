import mongoose, { Document, Schema } from "mongoose";
import { IChoice } from "./Choice";

export interface IStoryBeat extends Document {
    storyId: mongoose.Types.ObjectId;
    content: string;
    choices: IChoice[];
    beatNumber: number;
    createdAt: Date;
}

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

const StoryBeat = mongoose.model<IStoryBeat>("StoryBeat", StoryBeatSchema);
export default StoryBeat;
