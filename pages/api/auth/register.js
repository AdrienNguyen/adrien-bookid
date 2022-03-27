import nc from "next-connect"
import dbConnect from "../../../config/dbConnect"

import { registerUser } from "../../../controllers/authControllers"

import onError from "../../../middleware/error"

const handler = nc({
    onError,
})

dbConnect()

handler.post(registerUser)

export default handler
