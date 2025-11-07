// ./src/routes/chatRoutes.ts
import { Router, Request, Response } from 'express';
import { chatController } from '../controllers';

const router = Router();

router.get('/', chatController.getChats);

export default router;
