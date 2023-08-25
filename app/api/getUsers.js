const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();
const router = express.Router();

/**
 * Query the database for all the registers users
 * @returns {Object} allUsers: A json object with the data
 */
router.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  res.json(user);
});

module.exports = router;
