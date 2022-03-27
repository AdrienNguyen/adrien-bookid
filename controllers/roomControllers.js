import Room from "../models/room"
import Booking from "../models/booking"
import ErrorHandler from "../utils/errorHandler"
import catchAsyncError from "../middleware/catchAsyncError"
import APIFeatures from "../utils/apiFeatures"

const allRooms = catchAsyncError(async (req, res) => {
    const resPerPage = 4
    const roomsCount = await Room.countDocuments()

    const apiFeatures = new APIFeatures(Room.find(), req.query)
        .search()
        .filter()

    let rooms = await apiFeatures.query
    let filteredRoomsCount = rooms.length

    const apiFeatures2 = new APIFeatures(Room.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    rooms = await apiFeatures2.query

    res.status(200).json({
        success: true,
        roomsCount,
        resPerPage,
        filteredRoomsCount,
        rooms,
    })
})

// Create new room      =>      /api/rooms
const newRoom = catchAsyncError(async (req, res) => {
    const room = await Room.create(req.body)

    res.status(201).json({
        success: true,
        room,
    })
})

// Get room details      =>      /api/rooms/:id
const getSingleRoom = catchAsyncError(async (req, res, next) => {
    const room = await Room.findById(req.query.id)

    if (!room) {
        // res.status(404).json({
        //     success: false,
        //     error: "Room not found with this ID",
        // })

        return next(new ErrorHandler("Room not found with this ID", 404))
    }

    res.status(201).json({
        success: true,
        room,
    })
})

// Update room      =>      /api/rooms/:id
const updateRoom = catchAsyncError(async (req, res) => {
    let room = await Room.findById(req.query.id)

    if (!room) {
        // res.status(404).json({
        //     success: false,
        //     error: "Room not found with this ID",
        // })
        return next(new ErrorHandler("Room not found with this ID", 404))
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(201).json({
        success: true,
        room,
    })
})

// Delete room      =>      /api/rooms/:id
const deleteRoom = catchAsyncError(async (req, res) => {
    let room = await Room.findById(req.query.id)

    if (!room) {
        // res.status(404).json({
        //     success: false,
        //     error: "Room not found with this ID",
        // })
        return next(new ErrorHandler("Room not found with this ID", 404))
    }

    await room.remove()

    res.status(201).json({
        success: true,
        message: "Room is deleted.",
    })
})

// Create a new review      =>      /api/reviews
const createRoomReview = catchAsyncError(async (req, res) => {
    const { rating, comment, roomId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment: comment,
    }

    const room = await Room.findById(roomId)

    const isReviewed = room.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        room.reviews.forEach((review) => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })
    } else {
        room.reviews.push(review)
        room.numOfReviews = room.reviews.length
    }

    room.ratings =
        room.reviews.reduce((acc, item) => item.rating + acc, 0) /
        room.reviews.length

    await room.save({ validateBeforeSave: false })

    res.status(201).json({
        success: true,
    })
})

// Check review availability      =>      /api/reviews
const checkReviewAvailability = catchAsyncError(async (req, res) => {
    const { roomId } = req.query
    console.log(req.user._id)
    console.log(roomId)

    const bookings = await Booking.find({ user: req.user._id, room: roomId })
    console.log("ABC", bookings)

    let isReviewAvailable = false

    if (bookings.length > 0) isReviewAvailable = true

    res.status(201).json({
        success: true,
        isReviewAvailable,
    })
})

// Get all rooms: ADMIN     =>      /api/admin/rooms
const getAllAdminRooms = catchAsyncError(async (req, res) => {
    const rooms = await Room.find()

    res.status(200).json({
        success: true,
        rooms,
    })
})

export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom,
    createRoomReview,
    checkReviewAvailability,
    getAllAdminRooms,
}
