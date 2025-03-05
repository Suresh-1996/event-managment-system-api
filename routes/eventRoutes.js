const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createEvent,
  getAllEvents,
  searchEvents,
  getEventById,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");

const router = express.Router();

// Admin: Create a new event (Protected Route)
router.post("/", protect, createEvent);
updateEvent;

// Get all events (Public)
router.get("/", getAllEvents);

// Search events by title or date (Public)
router.get("/search", searchEvents);

// Get event by ID (Public)
router.get("/:id", getEventById);

// Admin: Delete an event (Protected Route)
router.delete("/:id", protect, deleteEvent);

//Update Event

router.put("/:id", updateEvent);

module.exports = router;
