import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const prisma = new PrismaClient();

// Create a game
export const createGame = async (req: AuthenticatedRequest, res: Response) => {
  const { title, platform, condition } = req.body;
  const imageUrl = (req.file as any)?.path;

  if (!title || !platform || !condition) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const game = await prisma.game.create({
      data: {
        title,
        platform,
        condition,
        imageUrl,
        ownerId: req.userId!,
      },
    });

    res.status(201).json(game);
  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).json({ error: "Failed to create game" });
  }
};

// Get all games
export const getAllGames = async (req: Request, res: Response) => {
  const { platform, title } = req.query;

  try {
    const games = await prisma.game.findMany({
      where: {
        AND: [
          platform
            ? { platform: { equals: String(platform), mode: "insensitive" } }
            : {},
          title
            ? { title: { contains: String(title), mode: "insensitive" } }
            : {},
        ],
      },
      include: {
        owner: {
          select: { id: true, email: true },
        },
      },
    });

    res.json(games);
  } catch (error) {
    res.status(500).json({ error: "Error fetching games" });
  }
};

// Get logged-in user's games
export const getMyGames = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId!;

  const games = await prisma.game.findMany({
    where: { ownerId: userId },
  });

  res.json(games);
};

// Delete a game
export const deleteGame = async (req: AuthenticatedRequest, res: Response) => {
  const gameId = req.params.id;
  const userId = req.userId!;

  const game = await prisma.game.findUnique({ where: { id: gameId } });

  if (!game || game.ownerId !== userId) {
    return res.status(403).json({ error: "Not authorized or game not found" });
  }

  await prisma.game.delete({ where: { id: gameId } });
  res.json({ message: "Game deleted successfully" });
};
