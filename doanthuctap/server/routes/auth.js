import  express  from "express";
import {signup, signin, googleAuth, logout} from "../controllers/auth.js"

const router = express.Router();
// create a user
router.post("/signup", signup)
// sign in 
router.post("/signin",signin)

// sign in with google
router.post("/google", googleAuth)

router.post("/logout", logout)


export default router;