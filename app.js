const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Import routes
const adminRoutes = require('./routes/admin');
const mealRoutes = require('./routes/meals');
const orderRoutes = require('./routes/orders');

// Database connection
const { connectDB } = require('./config/db');
connectDB();

app.use(cors({
  origin: 'https://mernfood-psi.vercel.app', // Replace with your front-end URL
  methods: 'GET,POST', // Add other methods if needed
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req,res)=>{
  res.send("Welcome to the Food Order API!");
})
app.use('/admin', adminRoutes);
app.use('/meals', mealRoutes);
app.use('/orders', orderRoutes);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT  || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
