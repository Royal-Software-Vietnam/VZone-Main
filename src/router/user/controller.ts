import { Request, Response } from "express"
import { validateEmail } from "../../helper/validation"
import Token from "../../helper/token"
import User from "../../model/User"
import bcrypt = require("bcrypt")
import sendOTP from "../../helper/otp"
import UserTransfer from "../../datatransfer/user"

export default class Controller {
    static signin = async (req:Request, res:Response) => {
        
    }

    static signup = async (req:Request, res:Response) => {
        try {
            let { name, username, email, password, gender, birthday } = req.body

            if (!validateEmail(email)) {
                return res.status(400).json("Invalid email address")
            }

            let emailChecker:any = await User.findOne({email})
            if (emailChecker) return res.status(400).json("Existed email")
            let hashPassword = await bcrypt.hash(password, 12)
            let user = await new User({ name, username, email, password:hashPassword, gender, birthday }).save()
            
            let accountVerificationToken = Token.generate({ id:user._id.toString() }, "1h")
            let verificationUrl = `${process.env.BASE_URL}/active/${accountVerificationToken}`
            await sendOTP(user.email, user.name, verificationUrl)

            let token = Token.generate({ id:user._id.toString() }, "7h")
            let userTransferObject = new UserTransfer(user, token)
            res.status(200).json(userTransferObject)
        } catch(error) {
            console.log(error)
            res.status(500).json("Some thing went wrong")
        }
    }
}