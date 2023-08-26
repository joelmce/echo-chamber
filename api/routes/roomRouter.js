const express = require("express");
const {
  getAllRooms,
  getRoomById,
} = require("../controllers/roomsController.js");

const router = express.Router();

/**
 * Query the database for all the registers users
 * @returns {Object} allUsers: A json object with the data
 */
router.get("/", getAllRooms);
router.get("/:id", getRoomById);

module.exports = router;
