import express from 'express';
import { signup, signin, google, signout } from '../Controllers/auth.controller.js';
const router = express.Router();

router.post("/signup", signup)

router.post("/signin", signin)
router.get("/signOut", signout)
router.post("/google", google)


export default router;