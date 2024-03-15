import { Router } from "express";
import Post from "../models/post.model.js"


const router = Router()

router.get("/posts", async (req, res) => {
    try {
      // Fetch all posts from the database
      const posts = await Post.find();
  
      // Render the 'allPosts.ejs' template with the posts data
      res.render("allPosts", { posts, user : req.user });
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: "Server error" });
    }
});



  
  export default router;