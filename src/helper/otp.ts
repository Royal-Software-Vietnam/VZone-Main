import nodemailer = require("nodemailer")
import { SendMailOptions } from "nodemailer/"
import { google } from "googleapis"

const oauth_url = "https://developers.google.com/oauthplayground"
const { OAuth2 } = google.auth
const { MAIN_EMAIL, GOOGLE_CLOUD_CLIENT, GOOGLE_CLOUD_SECRET, GOOGLE_CLOUD_REFRESH } = process.env

const auth = new OAuth2(
    GOOGLE_CLOUD_CLIENT,
    GOOGLE_CLOUD_SECRET,
    oauth_url,
)

export default async function sendOTP(email: string, name: string, url: string) {
    try {
        auth.setCredentials({ refresh_token: GOOGLE_CLOUD_REFRESH })
        let accessToken = auth.getAccessToken()
        let transport = nodemailer.createTransport({
            // @ts-ignore
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: MAIN_EMAIL,
                clientId: GOOGLE_CLOUD_CLIENT,
                clientSecret: GOOGLE_CLOUD_SECRET,
                refreshToken: GOOGLE_CLOUD_REFRESH,
                accessToken: accessToken
            }
        })
        let options: SendMailOptions = {
            from: MAIN_EMAIL,
            to: email,
            subject: "Virtual Zone",
            html: `
            <h1>Virtual Zone</h1>
            <b>Welcome!!! ${name}</b>
            <p>Go to ${url} to verify your account (60 mins left)</p>
        `
        }
        await transport.sendMail(options)
    } catch(error) {
        console.log(`Can not send email`, error)
    }
}
