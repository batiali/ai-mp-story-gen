import { TypedRequest, TypedResponse } from "./api.types";
import { IVote } from "../models/Vote";
import { IChoice } from "../models/Choice";

// Submit a vote
export interface SubmitVoteRequestBody {
    userId: string;
    choiceId: string;
    storyId: string;
    beatId: string;
}

export type SubmitVoteRequest = TypedRequest<{}, SubmitVoteRequestBody>;
export type SubmitVoteResponse = TypedResponse<{ message: string }>;

// Get votes for a beat
export interface GetVotesForBeatParams extends Record<string, string> {
    beatId: string;
}

export type GetVotesForBeatRequest = TypedRequest<GetVotesForBeatParams, {}, {}>;
export type GetVotesForBeatResponse = TypedResponse<IChoice[]>;

// Get user's vote for a beat
export interface GetUserVoteForBeatParams extends Record<string, string> {
    userId: string;
    beatId: string;
}

export type GetUserVoteForBeatRequest = TypedRequest<GetUserVoteForBeatParams, {}, {}>;
export type GetUserVoteForBeatResponse = TypedResponse<IVote>;
