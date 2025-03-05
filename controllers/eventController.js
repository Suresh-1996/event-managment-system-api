const Event = require("../models/Event");

// Create an event (Admin only)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, venue } = req.body;

    const event = new Event({
      title,
      description,
      date,
      venue,
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all events (Admin & User)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search events by title or date
exports.searchEvents = async (req, res) => {
  try {
    const { title, date } = req.query;
    let filter = {};

    if (title) filter.title = new RegExp(title, "i"); // Case-insensitive search
    if (date) filter.date = new Date(date);

    const events = await Event.find(filter);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update event
exports.updateEvent = async (req, res) => {
  const { title, description, date, venue } = req.body;

  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update event details
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.venue = venue || event.venue;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an event (Admin only)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
