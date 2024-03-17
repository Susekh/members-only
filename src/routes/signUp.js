import { Router } from "express";
import { signUpGet, signUpPost } from "../controller/auth.controller.js";
import { valUserPass } from "../middleware/expressValidator.js";


const router = Router()

router.get("/sign-up", signUpGet);

router.post("/sign-up", valUserPass , signUpPost);


export default router 