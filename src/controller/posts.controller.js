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
    res.render("createPostForm", {user : req.user});
}


const createPost_Post = asyncHandler(async(req, res) => {
    try {
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
    
        res.status(201).redirect("/posts");
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