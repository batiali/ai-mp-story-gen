import { TypedRequest, TypedResponse } from "./api.types";
import { IStoryBeat } from "../models/StoryBeat";

// Get all beats for a story
export interface GetStoryBeatsParams extends Record<string, string> {
    storyId: string;
}

export type GetStoryBeatsRequest = TypedRequest<GetStoryBeatsParams, {}, {}>;
export type GetStoryBeatsResponse = TypedResponse<IStoryBeat[]>;

// Get a specific beat
export interface GetStoryBeatParams extends Record<string, string> {
    beatId: string;
}

export type GetStoryBeatRequest = TypedRequest<GetStoryBeatParams, {}, {}>;
export type GetStoryBeatResponse = TypedResponse<IStoryBeat>;

// Get current beat for a story
export interface GetCurrentBeatParams extends Record<string, string> {
    storyId: string;
}

export type GetCurrentBeatRequest = TypedRequest<GetCurrentBeatParams, {}, {}>;
export type GetCurrentBeatResponse = TypedResponse<IStoryBeat>;

// Create a new story beat
export interface CreateStoryBeatRequestBody {
    storyId: string;
    content: string;
    choiceOptions: string[];
}

export type CreateStoryBeatRequest = TypedRequest<{}, CreateStoryBeatRequestBody>;
export type CreateStoryBeatResponse = TypedResponse<IStoryBeat>;
