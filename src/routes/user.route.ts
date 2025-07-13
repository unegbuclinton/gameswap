import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { getMyProfile } from "../controllers/user.controller";

const userRouter = Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile info with listed games and swap requests
 *       401:
 *         description: Unauthorized
 */

userRouter.get("/me", authenticateToken, getMyProfile);

export default userRouter;
