import { Request, Response } from "express";
import { User } from "../models";
import { CreateUserRequest, UpdateUserRequest, SyncUserProfileRequest } from "../types";

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        // Get user ID from auth token
        const userId = req.headers["user-id"];

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Find user by email (from Supabase auth)
        const email = req.headers["user-email"] as string;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching current user", error });
    }
};

// Sync user profile (create or update)
export const syncUserProfile = async (req: Request, res: Response) => {
    try {
        const { email, username, avatarUrl }: SyncUserProfileRequest = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
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

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error syncing user profile", error });
    }
};

// Create new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, avatarUrl }: CreateUserRequest = req.body;

        // Check if user with email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User with this email already exists" });
        }

        const newUser = new User({
            username,
            email,
            avatarUrl,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { username, avatarUrl }: UpdateUserRequest = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, avatarUrl },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
