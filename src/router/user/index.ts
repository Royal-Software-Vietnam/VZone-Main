import express = require("express")
import Controller from "./controller"

const router = express.Router()

router.post("/signup", Controller.signup)
router.post("/signin", Controller.signin)

export default router