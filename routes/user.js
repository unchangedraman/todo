import express from 'express';
import { isAuth } from '../middleware/auth.js';
const router = express();
import { getUserdetails, getallusers,register,login,logout } from '../controller/user.js';
router.use(express.json());
router.get("/all", getallusers);
router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me",isAuth, getUserdetails);// means jo gerUserdetails walaa function hai usme user ki saari details padii hui hai as usme hamne req kiya tha.
export default router;
