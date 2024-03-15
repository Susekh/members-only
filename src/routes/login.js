import { Router } from "express";
import passport from "../utils/passport/passport.js"


const router = Router()

router.post(
    "/log-in",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    })
  );


export default router