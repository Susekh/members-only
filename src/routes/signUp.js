import { Router } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"


const router = Router()

router.get("/sign-up", (req, res) => res.render("sign-up-form"));


router.post("/sign-up", async (req, res) => {
  try {
    const { username, password, member } = req.body;
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
  };
});



export { bcrypt }

export default router