import { Router } from 'express';
import EmailController from './Controllers/EmailController';

const router: Router = Router();

// Routes
router.post('/', EmailController.email);

export default router;
