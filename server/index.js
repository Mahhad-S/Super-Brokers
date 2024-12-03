const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const UserModel = require('./models/user');
const path = require("path");
const tradeRoutes = require('./routes/trades');
const stockRoutes = require('./routes/stockRoutes');
const newsRoutes = require('./routes/newsRoutes');
const followRoutes = require('./routes/followRoutes');

require('dotenv').config();

const app = express();

connectDB();

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',  // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

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


// Use the trade routes
app.use('/api/trades', tradeRoutes); 

// Use the stocks routes
app.use('/api/stocks', stockRoutes);

// Use the news routes
app.use('/api/news', newsRoutes);

// Use the follow routes
app.use('/api/follow', followRoutes);

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../super-brokers/dist')));
app.use('/images', express.static(path.join(__dirname, '../super-brokers/images')));

// Handle React routing, return all requests to the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../super-brokers/dist', 'index.html'));
});

app.listen(process.env.PORT || 3001, () => {
    console.log("server is running")
})