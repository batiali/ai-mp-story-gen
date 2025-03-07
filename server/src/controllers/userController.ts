import { User } from "../models";
import {
    CreateUserRequest,
    CreateUserResponse,
    DeleteUserRequest,
    DeleteUserResponse,
    GetAllUsersRequest,
    GetAllUsersResponse,
    GetCurrentUserRequest,
    GetCurrentUserResponse,
    GetUserByIdRequest,
    GetUserByIdResponse,
    SyncUserProfileRequest,
    SyncUserProfileResponse,
    UpdateUserRequest,
    UpdateUserResponse,
} from "../types/user.types";

// Get all users
export const getAllUsers = async (req: GetAllUsersRequest, res: GetAllUsersResponse) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching users" });
    }
};

// Get user by ID
export const getUserById = async (req: GetUserByIdRequest, res: GetUserByIdResponse) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching user" });
    }
};

// Get current user
export const getCurrentUser = async (
    req: GetCurrentUserRequest,
    res: GetCurrentUserResponse
) => {
    try {
        // Get user ID from auth token
        const userId = req.headers["user-id"];

        if (!userId) {
            return res.status(401).json({ success: false, error: "Unauthorized" });
        }

        // Find user by email (from Supabase auth)
        const email = req.headers["user-email"] as string;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching current user" });
    }
};

// Sync user profile (create or update)
export const syncUserProfile = async (
    req: SyncUserProfileRequest,
    res: SyncUserProfileResponse
) => {
    try {
        const { email, username, avatarUrl } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, error: "Email is required" });
        }

        // Find user by email
        let user = await User.findOne({ email });

        if (user) {
            // Update existing user
            user.username = username || user.username;
            if (avatarUrl !== undefined) {
                user.avatarUrl = avatarUrl;
            }

            await user.save();
        } else {
            // Create new user
            user = new User({
                email,
                username: username || email.split("@")[0],
                avatarUrl,
            });

            await user.save();
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error syncing user profile" });
    }
};

export const createUser = async (req: CreateUserRequest, res: CreateUserResponse) => {
    try {
        const { username, email, avatarUrl } = req.body;

        // Check if user with email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, error: "User with this email already exists" });
        }

        const newUser = new User({
            username,
            email,
            avatarUrl,
        });

        const savedUser = await newUser.save();
        res.status(201).json({ success: true, data: savedUser });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating user" });
    }
};

// Update user
export const updateUser = async (req: UpdateUserRequest, res: UpdateUserResponse) => {
    try {
        const { username, avatarUrl } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, avatarUrl },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating user" });
    }
};

// Delete user
export const deleteUser = async (req: DeleteUserRequest, res: DeleteUserResponse) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        res.status(200).json({ success: true, data: deletedUser });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting user" });
    }
};
