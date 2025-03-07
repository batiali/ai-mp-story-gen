import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

export interface IStory extends Document {
    title: string;
    description: string;
    createdBy: IUser;
    currentBeat: number;
    maxBeats: number;
    isActive: boolean;
}

const StorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        currentBeat: {
            type: Number,
            default: 0,
        },
        maxBeats: {
            type: Number,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Story = mongoose.model<IStory>("Story", StorySchema);
export default Story;
