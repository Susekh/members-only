import { Router } from "express";
import { showPosts, createPost_Get, createPost_Post } from "../controller/posts.controller.js";


const router = Router()

router.get("/", showPosts);

router.get("/createPost", createPost_Get);

router.post("/createPost",  createPost_Post);
  
export default router;