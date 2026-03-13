const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    getUserProfile,
    updateProfile,
    updateProfilePicture,
    toggleFollow,
    searchUsers
} = require("../controllers/userController");

router.get("/search", searchUsers);
router.get("/username", getUserProfile);

router.put("/profile", protect, updateProfile);
router.put("/profile-picture", protect, updateProfilePicture);
router.put("/:id/follow", protect, toggleFollow);

module.exports = router;