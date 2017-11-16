import { Router } from 'express';
import * as commentsController from '../controllers/comment.controller';

const router = new Router();

// Get comments by post ID
router.get('/comments/:postId', commentsController.getComment);

// Add a new comment to post with ID
router.post('/comments', commentsController.addComment);

// Edit comment with ID
router.put('/comments/:cuid', commentsController.editComment);

// Delete comment by ID
router.delete('/comments/:cuid', commentsController.deleteComment);

export default router;
