import { Router } from "express";
import {
  createGame,
  getAllGames,
  getMyGames,
  deleteGame,
} from "../controllers/game.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";

const gameRoutes = Router();

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Get all games
 *     tags: [Game]
 *     parameters:
 *       - in: query
 *         name: platform
 *         schema:
 *           type: string
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of games
 */
gameRoutes.get("/", getAllGames); // Public
/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Create a new game
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               platform:
 *                 type: string
 *               condition:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Game created successfully
 */
gameRoutes.post("/", authenticateToken, upload.single("image"), createGame);
/**
 * @swagger
 * /api/games/user:
 *   get:
 *     summary: Get current user's games
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's games
 */
gameRoutes.get("/user", authenticateToken, getMyGames);
/**
 * @swagger
 * /api/games/{id}:
 *   delete:
 *     summary: Delete a game
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Game deleted successfully
 */
gameRoutes.delete("/:id", authenticateToken, deleteGame);

export default gameRoutes;
