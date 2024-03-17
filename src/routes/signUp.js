import { Router } from "express";
import { signUpGet, signUpPost } from "../controller/auth.controller.js";


const router = Router()

router.get("/sign-up", signUpGet);

router.post("/sign-up", signUpPost);


export default router 