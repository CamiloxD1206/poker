import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema } from '../schemas/auth.schema.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', login, authRequired);
router.post('/logout', logout);

export default router;