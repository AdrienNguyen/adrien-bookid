import nc from "next-connect"
import dbConnect from "../../../config/dbConnect"

import { myBookings } from "../../../controllers/bookingControllers"
import { isAuthenticatedUser } from "../../../middleware/auth"

import onError from "../../../middleware/error"

const handler = nc({
    onError,
})

dbConnect()

handler.use(isAuthenticatedUser).get(myBookings)

export default handler
