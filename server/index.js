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

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Success")
            } else {
                res.json("the password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        let user = await UserModel.findOne({ email });
        if (user) {
            console.log("Email already exists");
            return res.status(400).json({ message: "Email already exists" });
        }

        user = new UserModel({ 
            username, 
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