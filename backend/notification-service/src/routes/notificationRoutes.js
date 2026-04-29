const express = require("express");
const { listNotifications, streamNotifications } = require("../controllers/notificationController");

const router = express.Router();

router.get("/", listNotifications);
router.get("/stream", streamNotifications);

module.exports = router;
