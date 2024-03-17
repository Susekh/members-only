import { Router } from "express";
import { logout } from "../controller/auth.controller.js";

const router = Router()

router.get("/log-out", logout);


export default router