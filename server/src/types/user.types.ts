import { TypedRequest, TypedResponse } from "./api.types";
import { IUser } from "../models/User";

// Create user
export interface CreateUserRequestBody {
    username: string;
    email: string;
    avatarUrl?: string;
}

export type CreateUserRequest = TypedRequest<{}, CreateUserRequestBody>;
export type CreateUserResponse = TypedResponse<IUser>;

// Get all users
export type GetAllUsersRequest = TypedRequest<{}, {}, {}>;
export type GetAllUsersResponse = TypedResponse<IUser[]>;

// Get user by id
export interface GetUserByIdParams extends Record<string, string> {
    id: string;
}

export type GetUserByIdRequest = TypedRequest<GetUserByIdParams, {}>;
export type GetUserByIdResponse = TypedResponse<IUser>;

// Get current user
export type GetCurrentUserRequest = TypedRequest<{}, {}, {}>;
export type GetCurrentUserResponse = TypedResponse<IUser>;

// Sync user profile
export interface SyncUserProfileRequestBody {
    email: string;
    username: string;
    avatarUrl?: string;
}
export type SyncUserProfileRequest = TypedRequest<{}, SyncUserProfileRequestBody>;
export type SyncUserProfileResponse = TypedResponse<IUser>;

// Update user
export interface UpdateUserRequestBody {
    username: string;
    avatarUrl?: string;
}

export interface UpdateUserParams extends Record<string, string> {
    id: string;
}
export type UpdateUserRequest = TypedRequest<UpdateUserParams, UpdateUserRequestBody>;
export type UpdateUserResponse = TypedResponse<IUser>;

// Delete user by id
export interface DeleteUserParams extends Record<string, string> {
    id: string;
}
export type DeleteUserRequest = TypedRequest<DeleteUserParams, {}>;
export type DeleteUserResponse = TypedResponse<IUser>;

// Delete all users
export type DeleteAllUsersRequest = TypedRequest<{}, {}, {}>;
export type DeleteAllUsersResponse = TypedResponse<IUser[]>;
