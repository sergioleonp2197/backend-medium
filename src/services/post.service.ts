import { Post } from '../models';

export const createPost = async (data: any, userId: number) => {
  return Post.create({
    ...data,
    userId,
    excerpt: data.excerpt ?? data.content.slice(0, 200)
  });
};

export const getAllPosts = async () => {
  return Post.findAll({
    include: [
      {
        association: 'user',
        attributes: ['id', 'name', 'avatar']
      }
    ],
    order: [['createdAt', 'DESC']]
  });
};

export const getPostById = async (id: number) => {
  return Post.findByPk(id, {
    include: [
      {
        association: 'user',
        attributes: ['id', 'name', 'avatar']
      }
    ]
  });
};
