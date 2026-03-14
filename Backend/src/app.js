const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
// const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet({
    crossOriginResourcePolicy: {policy: "cross-origin"},
}));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(er.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

module.exports = app;