const express = require("express");
const {
  bookEvent,
  cancelBooking,
  getUserBookings,
} = require("../controllers/bookingController");
const authMiddleware = require("../middleware/userAuthMiddleware");

const router = express.Router();

// Book an event (User)
router.post("/:eventId", authMiddleware, bookEvent);

// Cancel booking (User)
router.delete("/cancel/:eventId", authMiddleware, cancelBooking);

// Get all bookings for a user
router.get("/my-bookings", authMiddleware, getUserBookings);

module.exports = router;
