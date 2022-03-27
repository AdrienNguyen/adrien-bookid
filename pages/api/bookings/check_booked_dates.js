import nc from "next-connect"
import dbConnect from "../../../config/dbConnect"

import { checkBookedDatesOfRoom } from "../../../controllers/bookingControllers"

import onError from "../../../middleware/error"

const handler = nc({
    onError,
})

dbConnect()

handler.get(checkBookedDatesOfRoom)

export default handler
