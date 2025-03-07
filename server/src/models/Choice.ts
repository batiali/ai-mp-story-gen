import mongoose, { Document, Schema } from "mongoose";

export interface IChoice extends Document {
    content: string;
    votes: number;
    voters: mongoose.Types.ObjectId[];
}

const ChoiceSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        votes: {
            type: Number,
            default: 0,
        },
        voters: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Choice = mongoose.model<IChoice>("Choice", ChoiceSchema);
export default Choice;
