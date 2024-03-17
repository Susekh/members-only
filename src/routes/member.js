import { member_get, member_post, member_code_get } from "../controller/auth.controller.js";
import { Router } from "express";

const router = Router();
router.get("/member", member_get);
router.post("/member", member_post);
router.get("/member-code", member_code_get);

export default router;