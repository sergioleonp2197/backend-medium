import { Router } from 'express';
import * as postController from '../controllers/post.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', postController.findAll);
router.get('/:id', postController.findOne);
router.post('/', authMiddleware, postController.create);

export default router;
