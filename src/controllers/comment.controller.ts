import { Request, Response } from 'express';
import * as commentService from '../services/comment.service';

export const create = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const postId = Number(req.params.postId);
    const { content } = req.body;

    const comment = await commentService.createComment(
      content,
      postId,
      userId
    );

    res.status(201).json(comment);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const findByPost = async (req:Request, res:Response) =>{
    const postId = Number(req.params.postId);
    const comments = await commentService.getCommentsByPost(postId);
    res.json(comments);
}