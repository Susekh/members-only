import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import passport from "passport";
import session from "express-session";
import indexRouter from "./routes/index.js"
import signupRouter from "./routes/signUp.js"
import loginRouter from "./routes/login.js"
import logoutRouter from "./routes/logout.js"
import postRouter from "./routes/posts.js"
import memberRouter from "./routes/member.js"



const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));



app.use("/", indexRouter);
app.use("/auth", signupRouter);
app.use("/auth", loginRouter);
app.use("/auth", logoutRouter);
app.use("/auth", memberRouter);
app.use("/posts", postRouter);






export {app}
