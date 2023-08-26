const express = require("express");
const {
  getSongsInPlaylist,
  addSongToPlaylist,
} = require("../controllers/playlistController.js");

const router = express.Router();

/**
 * Query the database for all the registers users
 * @returns {Object} allUsers: A json object with the data
 */
router.get("/", getSongsInPlaylist);
router.post("/:playlistId/:songId", addSongToPlaylist);

module.exports = router;
