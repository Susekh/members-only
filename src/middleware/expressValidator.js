import { body } from "express-validator";

const valUserPass = [
    body("username")
        .trim()
        .isLength({min: 3})
        .escape(),
    body("password")
        .trim()
        .isLength({min: 3})
        .escape()
    ]

const valMember = body('member')
                    .trim()
                    .escape()

export  {valUserPass, valMember}