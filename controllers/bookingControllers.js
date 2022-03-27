import Booking from "../models/booking"

import catchAsyncError from "../middleware/catchAsyncError"

import Moment from "moment"
import { extendMoment } from "moment-range"

const moment = extendMoment(Moment)

// New Booking => /api/bookings
const newBooking = catchAsyncError(async (req, res) => {
    const {
        room,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
    } = req.body

    const booking = await Booking.create({
        room,
        user: req.user._id,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
    })

    res.status(200).json({
        success: true,
        booking,
    })
})

// Check Booking => /api/bookings/check
const checkBookingIsAvailable = catchAsyncError(async (req, res) => {
    const { roomId, checkInDate, checkOutDate } = req.query

    const checkInDateQuery = new Date(checkInDate)
    const checkOutDateQuery = new Date(checkOutDate)

    const bookings = await Booking.find({
        room: roomId,
        $and: [
            {
                checkInDate: {
                    $lte: checkOutDateQuery,
                },
            },
            {
                checkOutDate: {
                    $gte: checkInDateQuery,
                },
            },
        ],
    })

    let isAvailable

    if (bookings && bookings.length === 0) {
        isAvailable = true
    } else {
        isAvailable = false
    }

    res.status(200).json({
        success: true,
        isAvailable,
    })
})

// Check booked dates of a room => /api/bookings/check_booked_dates

const checkBookedDatesOfRoom = catchAsyncError(async (req, res) => {
    const { roomId } = req.query

    const bookings = await Booking.find({ room: roomId })

    const timeDifferences = moment().utcOffset() / 60

    let bookedDates = []

    bookings.forEach((booking) => {
        const checkInDate = moment(booking.checkInDate).add(
            timeDifferences,
            "hours"
        )
        const checkOutDate = moment(booking.checkOutDate).add(
            timeDifferences,
            "hours"
        )

        const range = moment.range(moment(checkInDate), moment(checkOutDate))

        const dates = Array.from(range.by("day"))

        bookedDates = bookedDates.concat(dates)
    })

    res.status(200).json({ success: true, bookedDates })
})

// Get all bookings of current user => /api/bookings/me

const myBookings = catchAsyncError(async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate({
            path: "room",
            select: "name pricePerNight images",
        })
        .populate({
            path: "user",
            selecT: "name email",
        })

    res.status(200).json({ success: true, bookings })
})

// Get booking details => /api/bookings/:id

const getBookingDetails = catchAsyncError(async (req, res) => {
    const booking = await Booking.findById(req.query.id)
        .populate({
            path: "room",
            select: "name pricePerNight images",
        })
        .populate({
            path: "user",
            selecT: "name email",
        })

    res.status(200).json({ success: true, booking })
})

export {
    newBooking,
    checkBookingIsAvailable,
    checkBookedDatesOfRoom,
    myBookings,
    getBookingDetails,
}
