import { combineReducers } from "redux"
import {
    allRoomsReducer,
    roomDetailsReducer,
    newReviewReducer,
    checkReviewReducer,
} from "./roomReducers"
import {
    checkBookingReducer,
    bookedDatesReducer,
    myBookingsReducer,
    bookingDetailsReducer,
} from "./bookingReducers"
import {
    authReducer,
    forgotPasswordReducer,
    userReducer,
    loadedUserReducer,
} from "./userReducers"

const reducers = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    loadedUser: loadedUserReducer,
    forgotPassword: forgotPasswordReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    myBookings: myBookingsReducer,
    bookingDetails: bookingDetailsReducer,
    newReview: newReviewReducer,
    checkReview: checkReviewReducer,
})

export default reducers
