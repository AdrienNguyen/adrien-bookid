import nc from "next-connect"
import dbConnect from "../../../config/dbConnect"

import { checkBookingIsAvailable } from "../../../controllers/bookingControllers"

import onError from "../../../middleware/error"

const handler = nc({
    onError,
})

dbConnect()

handler.get(checkBookingIsAvailable)

export default handler
