import { Comment } from '../models/comment.model';

export const createComment = async (
  content: string,
  postId: number,
  userId: number
) => {
  return Comment.create({
    content,
    postId,
    userId
  });
};

export const getCommentsByPost = async (postId: number) => {
  return Comment.findAll({
    where: { postId },
    include: [
      {
        association: 'user',
        attributes: ['id', 'name', 'avatar']
      }
    ],
    order: [['createdAt', 'ASC']]
  });
};
