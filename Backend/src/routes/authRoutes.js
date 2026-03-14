const express = require("express");
const router = express.Router();

const { register, login, logout, getMe, checkAuth } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protect, getMe);
router.get("/check", protect, checkAuth);

module.exports = router;