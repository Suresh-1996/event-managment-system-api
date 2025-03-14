const Event = require("../models/Event");
const Booking = require("../models/Booking");

// 📌 Book an Event
//

exports.bookEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const existingBooking = await Booking.findOne({
      user: userId,
      event: eventId,
    });
    if (existingBooking)
      return res.status(400).json({ message: "Already booked" });

    const booking = new Booking({ user: userId, event: eventId });
    await booking.save();

    const io = req.app.get("io");
    io.emit("newBooking", { message: `New booking for event: ${event.title}` });

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
    console.log(eventId);
    // Find and delete booking
    const booking = await Booking.findOneAndDelete({
      user: userId,
      event: eventId,
    });
    const io = req.app.get("io");
    io.emit("newBooking", { message: `New cancel events` });
    res.status(200).json({ message: "Event deleted successfully" });
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
