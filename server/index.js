const express = require('express');
const path = require('path');
const connectDB = require('./db');
const cors = require('cors');
const tradeRoutes = require('./routes/trades');
const stockRoutes = require('./routes/stockRoutes');
const newsRoutes = require('./routes/newsRoutes');
const followRoutes = require('./routes/followRoutes');
const UserModel = require('./models/user');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use('/api/trades', tradeRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/follow', followRoutes);

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../super-brokers/dist')));

// Fallback for React routing (ensure this is last)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../super-brokers/dist', 'index.html'));
});

// Start the server
app.listen(process.env.PORT || 3001, () => {
    console.log("Server is running");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate password
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Respond with user data, including _id for frontend usage
        res.status(200).json({
            message: "Login successful",
            _id: user._id,
            username: user.username,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    console.log("Incoming data:", { username, email, password });

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        user = new UserModel({ 
            username, // Correctly map the username field
            email, 
            password, 
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});