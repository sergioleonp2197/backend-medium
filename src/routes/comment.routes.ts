import { Router } from 'express';
import * as commentController from '../controllers/comment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/:postId', commentController.findByPost);
router.post('/:postId', authMiddleware, commentController.create);

export default router;
