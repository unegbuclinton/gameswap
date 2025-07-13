import { Router } from "express";
import {
  createSwapRequest,
  getMySwapRequests,
  getIncomingSwapRequests,
  respondToSwap,
} from "../controllers/swap.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const swapRoute = Router();

/**
 * @swagger
 * /api/swaps:
 *   post:
 *     summary: Create a swap request
 *     tags: [Swap]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gameId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Swap request created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
swapRoute.post("/", authenticateToken, createSwapRequest);
/** * @swagger
 * /api/swaps/my-requests:
 *   get:
 *     summary: Get current user's swap requests
 *     tags: [Swap]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's swap requests
 *       401:
 *         description: Unauthorized
 */
swapRoute.get("/my-requests", authenticateToken, getMySwapRequests);
/** * @swagger
 * /api/swaps/incoming:
 *   get:
 *     summary: Get incoming swap requests for user's games
 *     tags: [Swap]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of incoming swap requests
 *       401:
 *         description: Unauthorized
 */
swapRoute.get("/incoming", authenticateToken, getIncomingSwapRequests);
/** * @swagger
 * /api/swaps/{id}/respond:
 *   patch:
 *     summary: Respond to a swap request
 *     tags: [Swap]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               response:
 *                 type: string
 *                 enum: [accept, reject]
 *     responses:
 *       200:
 *         description: Swap request response updated successfully
 *       400:
 *         description: Bad request
 */
swapRoute.patch("/:id/respond", authenticateToken, respondToSwap);

export default swapRoute;
