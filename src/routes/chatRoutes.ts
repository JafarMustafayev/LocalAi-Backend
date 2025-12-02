// ./src/routes/chatRoutes.ts
import { Router } from 'express';
import { chatController } from '../controllers';

const router = Router();

router.get('/', chatController.getChats);
router.get('/:id', chatController.getChat);

router.post('/', chatController.createNewChat);

router.patch('/:id', chatController.renameChat);
router.patch('/:id/archive', chatController.toggleArchiveChat);
router.delete('/:id', chatController.deleteChat);

export default router;
