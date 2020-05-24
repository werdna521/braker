import express from 'express';
import { authenticate, register } from '../controllers/auth.controller';

const router = express.Router();

router.post('/authenticate', authenticate);
router.post('/register', register);

export default router;