const express = require("express");
const router = express.Router(); // Create router object

// Import controller functions
const { registerUser, loginUser } = require("../controller/User");

// POST /register => calls registerUser()
router.post("/register", registerUser);

// POST /login => calls loginUser()
router.post("/login", loginUser);

module.exports = router; // Export the router
