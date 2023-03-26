import jwt = require("jsonwebtoken")

export default class Token {
    static generate = (payload:any, expiresIn:any) => {
        return jwt.sign(payload, process.env.TOKEN_SECRET as string, { expiresIn })
    }
}