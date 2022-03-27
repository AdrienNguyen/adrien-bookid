import nc from "next-connect"
import dbConnect from "../../../config/dbConnect"
import { updateProfile } from "../../../controllers/authControllers"
import { isAuthenticatedUser } from "../../../middleware/auth"
import onError from "../../../middleware/error"

const handler = nc({
    onError,
})

dbConnect()

handler.use(isAuthenticatedUser).put(updateProfile)

export default handler
