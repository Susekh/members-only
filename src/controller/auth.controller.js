import asyncHandler from "../utils/asyncHandler.js"
import passport from "../middleware/passport/passport.js"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"




//signUp part

const signUpPost = asyncHandler(
    async (req, res) => {
        try {
          const { username, password } = req.body;
           // Check if username already exists
           const existingUser = await User.findOne({ username });
           if (existingUser) {
             return res.status(400).json({ message: "Username already exists" });
           }
      
          bcrypt.hash(password, 10, async(err, hashedPassword) => {
            if(err){
              throw err;
            } else {
               const user = new User({
                  username : username,
                  password: hashedPassword,
                  member : true,
                  admin : true
              });
              await user.save();
            }
          });
      
          res.redirect("/");
        } catch(err) {
          res.status(500).json({ message: "Server error" });
        }
      }
)


const signUpGet = (req, res) => res.render("sign-up-form", {user : req.user})



//Login part

const login_get = (req, res) =>  {
  res.render("log-in-form", {user : req.user})
}


const login_post = passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
      })




//logout part

const logout = (req, res, next) => {
                req.logout((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect("/auth/log-in");
                });
            }



export {
    signUpGet,
    signUpPost,
    login_get,
    login_post,
    logout,
    bcrypt
}