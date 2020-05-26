import express from 'express';
import { authenticate, register, signOut, superman } from '../controllers/auth.controller';
import { cookieMan } from '../middleware/middlewares';

const router = express.Router();

router.get('/superman', cookieMan, superman);
router.post('/sign-out', cookieMan, signOut);
router.post('/authenticate', authenticate);
router.post('/register', register);

export default router;