import { Router } from "express";
import { showPosts, createPost_Get, createPost_Post, delete_Post } from "../controller/posts.controller.js";


const router = Router()

router.get("/", showPosts);

router.get("/createPost", createPost_Get);

router.post("/createPost",  createPost_Post);

router.post("/delete/:postId", delete_Post)
  
export default router;