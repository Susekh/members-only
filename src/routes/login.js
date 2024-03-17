import { Router } from "express";
import { login_post, login_get } from "../controller/auth.controller.js";



const router = Router()

router.get("/log-in", login_get)
router.post("/log-in", login_post);


export default router