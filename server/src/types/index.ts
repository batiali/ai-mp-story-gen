// Story related types
export interface CreateStoryRequest {
    title: string;
    description: string;
    maxBeats: number;
    userId: string;
}

export interface UpdateStoryRequest {
    title?: string;
    description?: string;
    isActive?: boolean;
}

export interface StoryResponse {
    _id: string;
    title: string;
    description: string;
    createdBy: {
        _id: string;
        username: string;
        avatarUrl?: string;
    };
    currentBeat: number;
    maxBeats: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface StoriesResponse {
    stories: StoryResponse[];
}

export interface StoryErrorResponse {
    message: string;
    error: any;
}

// User related types
export interface CreateUserRequest {
    username: string;
    email: string;
    avatarUrl?: string;
}

export interface UpdateUserRequest {
    username?: string;
    email?: string;
    avatarUrl?: string;
}

export interface SyncUserProfileRequest {
    userId: string;
    username: string;
    email: string;
    avatarUrl?: string;
}

export interface UserResponse {
    _id: string;
    username: string;
    email: string;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UsersResponse {
    users: UserResponse[];
}

export interface UserErrorResponse {
    message: string;
    error: any;
}

// Common response types
export interface SuccessResponse {
    message: string;
}

export interface ErrorResponse {
    message: string;
    error: any;
}
