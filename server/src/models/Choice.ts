import mongoose, { Document, Schema } from "mongoose";

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

export default mongoose.model("Choice", ChoiceSchema);
