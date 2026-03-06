import { Router } from 'express';
import * as likeController from '../controllers/like.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/:postId', authMiddleware, likeController.toggle);
router.get('/:postId/count', likeController.count);

export default router;
