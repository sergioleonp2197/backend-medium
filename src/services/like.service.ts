import { Like } from '../models/like.model';

export const toggleLike = async (postId: number, userId: number) => {
  const exists = await Like.findOne({ where: { postId, userId } });

  if (exists) {
    await exists.destroy();
    return { liked: false };
  }

  await Like.create({ postId, userId });
  return { liked: true };
};

export const countLikes = async (postId: number) => {
  return Like.count({ where: { postId } });
};
