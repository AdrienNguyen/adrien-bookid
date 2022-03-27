import nc from "next-connect"
import dbConnect from "../../../config/dbConnect"

import { createRoomReview } from "../../../controllers/roomControllers"
import onError from "../../../middleware/error"
import { isAuthenticatedUser } from "../../../middleware/auth"

const handler = nc({
    onError,
})

dbConnect()

handler.use(isAuthenticatedUser).put(createRoomReview)

export default handler
