import express from 'express';
import { getUserById, test, updateUser, deleteUser, changePassword } from '../Controllers/user.controller.js';
import { verifiedToken } from '../utils/authenticatedUser.js';

const router = express.Router();

router.get('/', test);
router.get('/:userId', verifiedToken, getUserById);
router.post("/:userId", verifiedToken, (req, res) => {
    const loggedInUserId = req.userId;
    updateUser(req, res, loggedInUserId);
});
router.delete("/delete/:id", verifiedToken, deleteUser);
router.post('/:userId/change-password', verifiedToken, changePassword);

export default router;