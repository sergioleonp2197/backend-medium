import { Request, Response } from 'express';
import * as likeService from '../services/like.service';

export const toggle = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const postId = Number(req.params.postId);
    if (!postId) {
      return res.status(400).json({ message: 'postId es requerido' });
  }

    const result = await likeService.toggleLike(postId, userId);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const count = async (req: Request, res: Response) => {
  const postId = Number(req.params.postId);
  const total = await likeService.countLikes(postId);
  res.json({ total });
};
