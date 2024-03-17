import { member_get, member_post } from "../controller/auth.controller.js";
import { Router } from "express";

const router = Router();
router.get("/member", member_get);
router.post("/member", member_post);

export default router;