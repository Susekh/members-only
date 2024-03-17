import asyncHandler from "../utils/asyncHandler.js"
import passport from "../middleware/passport/passport.js"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"




//signUp part

function generateMemberString() {
  const length = Math.floor(Math.random() * 5) + 7; // Random length between 7 to 11
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}


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
              const memCode = generateMemberString();
               const user = new User({
                  username : username,
                  password: hashedPassword,
                  member : false,
                  admin : true,
                  memberCode : memCode
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


//member part

const member_get = (req, res) => {
  res.render("member", {user : req.user});
}

const member_post = asyncHandler(
  async (req, res) => {
    const member = req.body.member;
    const userId = req.user._id;
    // Find the user by ID
    const user = await User.findById(userId);
    if(member === user.memberCode){
      user.member = true;
      await user.save();
      res.redirect("/posts")
    }
  
  }
)


export {
    signUpGet,
    signUpPost,
    login_get,
    login_post,
    logout,
    bcrypt,
    member_get,
    member_post
}