import express, { Router } from "express";
import { userController } from "../controllers";
import { requireAuth } from "../middleware/authMiddleware";

const router: Router = express.Router();

// GET current user (protected)
router.get("/me", requireAuth, userController.getCurrentUser);

// POST sync user profile
router.post("/sync", userController.syncUserProfile);

// GET all users (protected)
router.get("/", requireAuth, userController.getUsers);

// GET user by ID (protected)
router.get("/:id", requireAuth, userController.getUserById);

// POST create new user
router.post("/", userController.createUser);

// PUT update user (protected)
router.put("/:id", requireAuth, userController.updateUser);

// DELETE user (protected)
router.delete("/:id", requireAuth, userController.deleteUser);

export default router;
