import nc from "next-connect"
import dbConnect from "../../../config/dbConnect"

import { stripeCheckoutSession } from "../../../controllers/paymentControllers"
import { isAuthenticatedUser } from "../../../middleware/auth"

import onError from "../../../middleware/error"

const handler = nc({
    onError,
})

dbConnect()

handler.use(isAuthenticatedUser).get(stripeCheckoutSession)

export default handler
