import  express  from "express";
import { deleteTask, getallTask, newtask, updateTask } from "../controller/task.js";
import { isAuth } from "../middleware/auth.js";
const router = express.Router();


router.post("/new",isAuth, newtask);// is auth ko add kiya means vo cookies wala system aa gya now sirf wahi add kr paayega jo logged in ho rakha hai
router.get("/mytask",isAuth, getallTask);
router.route("/:id").put(isAuth,updateTask).delete(isAuth,deleteTask);
export default router;
