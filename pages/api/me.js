import nc from "next-connect"
import dbConnect from "../../config/dbConnect"

import { currentUserProfile } from "../../controllers/authControllers"
import { isAuthenticatedUser } from "../../middleware/auth"

import onError from "../../middleware/error"

const handler = nc({
    onError,
})

dbConnect()

handler.use(isAuthenticatedUser).get(currentUserProfile)

export default handler
