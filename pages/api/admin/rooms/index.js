import nc from "next-connect"
import dbConnect from "../../../../config/dbConnect"

import { getAllAdminRooms } from "../../../../controllers/roomControllers"
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middleware/auth"

import onError from "../../../../middleware/error"

const handler = nc({
    onError,
})

dbConnect()

handler
    .use(isAuthenticatedUser, authorizeRoles(["admin"]))
    .get(getAllAdminRooms)

export default handler
