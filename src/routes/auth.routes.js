import express from 'express';

import { signUpStatus, signUp, signIn, signOut } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/sign-up', signUpStatus);
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', signOut);

export default router;
