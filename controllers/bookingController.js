const Event = require("../models/Event");
const Booking = require("../models/Booking");

// 📌 Book an Event
exports.bookEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    console.log(eventId, userId);

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user has already booked the event
    const existingBooking = await Booking.findOne({
      user: userId,
      event: eventId,
    });
    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "You have already booked this event" });
    }

    // Create booking
    const booking = new Booking({ user: userId, event: eventId });
    await booking.save();

    res.status(201).json({ message: "Event booked successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    // Find and delete booking
    const booking = await Booking.findOneAndDelete({
      user: userId,
      event: eventId,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get All Bookings for Logged-in User
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all bookings for the user
    const bookings = await Booking.find({ user: userId }).populate("event");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
