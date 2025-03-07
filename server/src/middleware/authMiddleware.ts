import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || "";

// Create Supabase client only if credentials are available
const supabase =
    supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

/**
 * Middleware to verify JWT token from Supabase and extract user information
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Skip authentication if Supabase is not configured
        if (!supabase) {
            console.warn("Supabase not configured. Authentication middleware disabled.");
            return next();
        }

        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(); // Continue without authentication
        }

        const token = authHeader.split(" ")[1];

        // Verify the token with Supabase
        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            return next(); // Continue without authentication
        }

        // Add user information to request headers
        req.headers["user-id"] = data.user.id;
        req.headers["user-email"] = data.user.email;

        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        next(); // Continue without authentication
    }
};

/**
 * Middleware to require authentication
 */
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers["user-id"];

    if (!userId) {
        return res.status(401).json({ message: "Authentication required" });
    }

    next();
};
