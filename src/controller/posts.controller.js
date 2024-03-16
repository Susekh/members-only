import asyncHandler from "../utils/asyncHandler.js";
import Post from "../models/post.model.js";


const showPosts = asyncHandler(async (req, res) => {
    try {
      // Fetch all posts from the database
      const posts = await Post.find();
  
      // Render the 'allPosts.ejs' template with the posts data
      res.render("allPosts", { posts, user : req.user });
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: "Server error" });
    }
})


const createPost_Get = (req, res) => {
    // Check if user exists
    if (!req.user) {
      // Redirect to posts route if user doesn't exist
      return res.redirect("/");
    }
  
    // Render your create post form here
    // For simplicity, assuming a placeholder 'createPostForm.ejs' template
    res.render("createPostForm");
}


const createPost_Post = asyncHandler(async(req, res) => {
    try {
        // Check if user exists
        if (!req.user) {
          // Redirect to posts route if user doesn't exist
          return res.redirect("/");
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
})


export {
    showPosts,
    createPost_Get,
    createPost_Post
}