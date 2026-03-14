const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
exports.register = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      if (userExists.email === email) {
        return res.status(400).json({
          message: "Email already exists. Please use a different email.",
        });
      }

      if (userExists.username === username) {
        return res.status(400).json({
          message:
            "Username already taken. Please choose a different username.",
        });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      fullName: fullName || username,
      profilePic: `https://ui-avatars.com/api/?name=${username}&background=random&size=150`,
      bio: "Hey there ! I'm using Socify.",
      gender: "prefer-not-to-say",
      isPrivate: false,
      followers: [],
      following: [],
      postsCount: 0,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
        bio: user.bio,
        gender: user.gender,
        isPrivate: user.isPrivate,
        followersCount: user.followers.length,
        followingCount: user.following.length,
        postsCount: user.postsCount,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      error: "Server error during registration. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    user.lastActive = Date.now();
    await user.save();

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
        bio: user.bio,
        gender: user.gender,
        isPrivate: user.isPrivate,
        followersCount: user.followers.length,
        followingCount: user.following.length,
        postsCount: user.postsCount,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        lastActive: user.lastActive,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Server error during login. Please try again.",
    });
  }
};

exports.logout = (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      error: "Server error during logout",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("followers", "username profilePic fullName")
      .populate("following", "username profilePic fullName");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
        bio: user.bio,
        gender: user.gender,
        isPrivate: user.isPrivate,
        followersCount: user.followers.length,
        followingCount: user.following.length,
        postsCount: user.postsCount,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        lastActive: user.lastActive,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const user = await User.finById(req.user.id).select("-password");

    res.json({
      success: true,
      authenticated: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error("Check auth error:", error);
    res.status(500).json({
      success: false,
      authenticated: false,
      error: "Server error",
    });
  }
};
