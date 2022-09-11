import  express  from "express";
import {update, deleteUser,getUser, subscribe, unsubscribe, like, dislike, getAllUser } from "../controllers/user.js"
import { verifyToken } from "../verifyToken.js";
const router = express.Router();


router.get("/getUser",getAllUser)
// update user 
router.put("/:id", verifyToken, update)
// delete user
router.delete("/:id", verifyToken, deleteUser)

// get a user
router.get("/find/:id", getUser)
// subscribe to user
router.put("/sub/:id",verifyToken, subscribe)

// unsubscribe from user
router.put("/unsub/:id",verifyToken, unsubscribe)

//like video user
router.put("/like/:videoId",verifyToken, like)

//dislike video user

router.put("/dislike/:videoId",verifyToken, dislike);

export default router;