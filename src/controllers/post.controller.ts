import { Request, Response } from 'express';
import * as postService from '../services/post.service';

export const create = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const post = await postService.createPost(req.body, userId);
    res.status(201).json(post);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const findAll = async (_: Request, res: Response) => {
  const posts = await postService.getAllPosts();
  res.json(posts);
};

export const findOne = async (req: Request, res: Response) => {
  const post = await postService.getPostById(Number(req.params.id));
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};
