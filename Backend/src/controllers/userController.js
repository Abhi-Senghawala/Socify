const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
      .select("-password -email")
      .populate("followers", "username profilePic fullName")
      .populate("following", "username profilePic fullName");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isPrivate) {
      // logic here to check if the requesting user follows this user
      // temporary, return limited info
      return res.json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          fullName: user.fullName,
          profilePic: user.profilePic,
          bio: user.bio,
          isPrivate: user.isPrivate,
          postsCount: user.postsCount,
          followersCount: user.followers.length,
          followingCount: user.following.length,
        },
      });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePic: user.profilePic,
        bio: user.bio,
        isPrivate: user.isPrivate,
        postsCount: user.postsCount,
        followersCount: user.followers.length,
        followingCount: user.following.length,
        followers: user.followers,
        following: user.following,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullName, bio, gender, isPrivate } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (fullName) user.fullName = fullName;
    if (bio !== undefined) user.bio = bio;
    if (gender) user.gender = gender;
    if (!isPrivate !== undefined) user.isPrivate = isPrivate;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
        bio: user.bio,
        gender: user.gender,
        isPrivate: user.isPrivate,
        postsCount: user.postsCount,
        followersCount: user.followers.length,
        followingCount: user.following.length,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const user = await User.findById(req.user._id);

    // temporary we will update image with the file path
    const profilePic = req.file.path;

    user.profilePic = profilePic;
    await user.save();

    res.json({
      success: true,
      message: "Profile picture updated successfully",
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Update profile picture error:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

exports.toggleFollow = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (userToFollow._id.toString() === currentUser._id.toString()) {
      return res.json(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const isFollowing = currentUser.following.includes(userToFollow._id);

    if (isFollowing) {
      // unfollow
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== userToFollow._id.toString(),
      );

      userToFollow.followers = userToFollow.followers.filter(
        (id) => id.toString() !== currentUser._id.toString(),
      );
    } else {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({
      success: true,
      message: isFollowing
        ? "Unfollowed Successfully"
        : "Followed successfully",
      isFollowing: !isFollowing,
    });
  } catch (error) {
    console.error("Toggle follow error:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

exports.searchUsers = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.json({ users: [] });
        }

        const users = await User.find({
            $or: [
                { username: { $regex: q, $options: 'i' } },
                { fullName: { $regex: q, $options: 'i' } }
            ]
        })
            .select('username fullName profilePic isVerified')
            .limit(20);
        
        res.json({
            success: true,
            users
        });
    } catch (error) {
        console.error("Search users error:", error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
};