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



// GET route to render the create post form
router.get("/createPost", (req, res) => {
    // Check if user exists
    if (!req.user) {
      // Redirect to posts route if user doesn't exist
      return res.redirect("/posts");
    }
  
    // Render your create post form here
    // For simplicity, assuming a placeholder 'createPostForm.ejs' template
    res.render("createPostForm");
});


router.post("/createPost", async(req, res) => {
    try {
        // Check if user exists
        if (!req.user) {
          // Redirect to posts route if user doesn't exist
          return res.redirect("/posts");
        }
    
        const { title, content } = req.body;
    
        
        const author = req.user._id;
    
        // Create a new post
        const newPost = new Post({
          title,
          content,
          author,
          createdOn: Date.now()
        });
    
        // Save the post to the database
        await newPost.save();
    
        res.status(201).json({ message: "Post created successfully", post: newPost });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
} )
  
  export default router;