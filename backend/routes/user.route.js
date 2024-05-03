import express from 'express';
import { updateBasicInfo, getUserById, test, updateUser, deleteUser, changePassword, updateUserProfile} from '../Controllers/user.controller.js';
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
router.post('/update/:id', verifiedToken, updateUserProfile);
router.post('/update-basic-info/:id', verifiedToken, updateBasicInfo); 


export default router;