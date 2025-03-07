import { TypedRequest, TypedResponse } from "./api.types";
import { IStory } from "../models/Story";

// Create story
export interface CreateStoryRequestBody {
    title: string;
    description: string;
    maxBeats: number;
    userId: string;
}

export type CreateStoryRequest = TypedRequest<{}, CreateStoryRequestBody>;
export type CreateStoryResponse = TypedResponse<IStory>;

// Get all stories
export type GetAllStoriesRequest = TypedRequest<{}, {}, {}>;
export type GetAllStoriesResponse = TypedResponse<IStory[]>;

// Get story by id
export interface GetStoryByIdParams extends Record<string, string> {
    id: string;
}

export type GetStoryByIdRequest = TypedRequest<GetStoryByIdParams, {}>;
export type GetStoryByIdResponse = TypedResponse<IStory>;

// Update story
export interface UpdateStoryRequestBody {
    title?: string;
    description?: string;
    isActive?: boolean;
}

export interface UpdateStoryParams extends Record<string, string> {
    id: string;
}

export type UpdateStoryRequest = TypedRequest<UpdateStoryParams, UpdateStoryRequestBody>;
export type UpdateStoryResponse = TypedResponse<IStory>;

// Delete story
export interface DeleteStoryParams extends Record<string, string> {
    id: string;
}

export type DeleteStoryRequest = TypedRequest<DeleteStoryParams, {}>;
export type DeleteStoryResponse = TypedResponse<IStory>;

// Delete all stories
export type DeleteAllStoriesRequest = TypedRequest<{}, {}, {}>;
export type DeleteAllStoriesResponse = TypedResponse<{ count: number }>;
