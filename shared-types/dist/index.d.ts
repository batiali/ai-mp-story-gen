export interface User {
    id: string;
    username: string;
    email: string;
    avatarUrl?: string;
    createdAt: Date;
}
export interface Story {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    currentBeat: number;
    maxBeats: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface StoryBeat {
    id: string;
    storyId: string;
    content: string;
    choices: Choice[];
    beatNumber: number;
    createdAt: Date;
}
export interface Choice {
    id: string;
    content: string;
    votes: number;
    voters: string[];
}
export interface Vote {
    userId: string;
    choiceId: string;
    storyId: string;
    beatId: string;
    timestamp: Date;
}
export interface SocketEvents {
    JOIN_STORY: "join_story";
    LEAVE_STORY: "leave_story";
    NEW_BEAT: "new_beat";
    SUBMIT_VOTE: "submit_vote";
    VOTE_UPDATE: "vote_update";
    STORY_PROGRESS: "story_progress";
    CHAT_MESSAGE: "chat_message";
}
