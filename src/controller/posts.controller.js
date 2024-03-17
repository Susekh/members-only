import asyncHandler from "../utils/asyncHandler.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";


const showPosts = asyncHandler(async (req, res) => {
    try {
      // Fetch all posts from the database
      const posts = await Post.find();
      if (req.user) {
        // Retrieve author's name for each post
        const postsWithAuthorNames = await Promise.all(posts.map(async (post) => {
          const author = await User.findById(post.author);
          const authorName = author ? author.username : 'Unknown'; 
          return { ...post.toObject(), authorName }; 
        }));
        res.render("allPosts", { posts : postsWithAuthorNames, user : req.user});
      }
      // Render the 'allPosts.ejs' template with the posts data
      res.render("allPosts", { posts, user : req.user});
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