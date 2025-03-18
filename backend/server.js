require("dotenv").config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const paymentRoutes = require("./routes/paymentRoutes");



// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Body parser for JSON data

// API Routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/orders', orderRoutes); // Order routes
app.use("/api/payment", paymentRoutes);
app.use("/api/users", require("./routes/userRoutes"));

// Error Handling Middleware
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Backend is running on Vercel 🚀");
});

// Server Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
