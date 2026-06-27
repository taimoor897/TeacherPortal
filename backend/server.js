console.log("Loading authRoutes");
const authRoutes = require('./routes/authRoutes');

console.log("Loading studentRoutes");
const studentRoutes = require('./routes/studentRoutes');

console.log("Loading attendanceRoutes");
const attendanceRoutes = require('./routes/attendanceRoutes');

console.log("Loading messageRoutes");
const messageRoutes = require('./routes/messageRoutes');

console.log("Loading aiRoutes");
const aiRoutes = require('./routes/aiRoutes');

console.log("Loading dashboardRoutes");
const dashboardRoutes = require('./routes/dashboardRoutes');
const feeRoutes = require('./routes/feeRoutes');
const parentAuthRoutes = require('./routes/parentAuthRoutes');
const parentRoutes = require('./routes/parentRoutes');
const teacherRoutes = require("./routes/teacherRoutes");
console.log(parentRoutes);
const marksRoutes = require("./routes/marksRoutes");
const diaryRoutes = require("./routes/diaryRoutes");
const chatRoutes = require("./routes/chatRoutes");

console.log("All routes loaded");

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');


dotenv.config();



// Connect to MongoDB
console.log("Before connectDB");
connectDB();
console.log("After connectDB call");

const app = express();

// Middleware
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://YOUR_USERNAME.github.io"
    ],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/parent/auth', parentAuthRoutes);
app.use('/api/parents', parentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/diary", diaryRoutes);
app.use("/api/chat", chatRoutes);

// Home Route
app.get('/', (req, res) => {
    res.send('ParentConnect API Running...');
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
