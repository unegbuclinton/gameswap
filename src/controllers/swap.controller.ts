import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const prisma = new PrismaClient();

// Create a swap request
export const createSwapRequest = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { gameId, offeredGameId } = req.body;
  const requesterId = req.userId!;

  try {
    // Check if requesting own game
    const targetGame = await prisma.game.findUnique({ where: { id: gameId } });
    if (!targetGame) return res.status(404).json({ error: "Game not found" });

    if (targetGame.ownerId === requesterId) {
      return res
        .status(400)
        .json({ error: "You cannot request your own game" });
    }

    // Check if already requested
    const existingRequest = await prisma.swapRequest.findFirst({
      where: {
        requesterId,
        gameId,
        status: "PENDING",
      },
    });

    if (existingRequest) {
      return res.status(400).json({ error: "You already requested this game" });
    }

    // Optional: validate offered game
    if (offeredGameId) {
      const offered = await prisma.game.findUnique({
        where: { id: offeredGameId },
      });
      if (!offered || offered.ownerId !== requesterId) {
        return res
          .status(403)
          .json({ error: "You can only offer a game you own" });
      }
    }

    const swap = await prisma.swapRequest.create({
      data: {
        requesterId,
        gameId,
        offeredGameId,
      },
      include: {
        game: true,
        offeredGame: true,
      },
    });

    res.status(201).json(swap);
  } catch (error) {
    res.status(500).json({ error: "Failed to create swap request" });
  }
};

// Get my sent requests
export const getMySwapRequests = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const requesterId = req.userId!;
  const requests = await prisma.swapRequest.findMany({
    where: { requesterId },
    include: {
      game: true,
      offeredGame: true,
    },
  });

  res.json(requests);
};

// Get incoming requests for my games
export const getIncomingSwapRequests = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.userId!;
  const requests = await prisma.swapRequest.findMany({
    where: {
      game: {
        ownerId: userId,
      },
    },
    include: {
      requester: true,
      game: true,
      offeredGame: true,
    },
  });

  res.json(requests);
};

// Accept/Decline a request
export const respondToSwap = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["ACCEPTED", "DECLINED"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const swap = await prisma.swapRequest.findUnique({
    where: { id },
    include: { game: true },
  });

  if (!swap) return res.status(404).json({ error: "Swap request not found" });

  if (swap.status !== "PENDING") {
    return res.status(400).json({ error: "Swap already responded to" });
  }

  if (swap.game.ownerId !== req.userId) {
    return res.status(403).json({ error: "You are not authorized to respond" });
  }

  await prisma.swapRequest.update({
    where: { id },
    data: { status },
  });

  res.json({ message: `Swap request ${status.toLowerCase()}` });
};
