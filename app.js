const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Import routes
const adminRoutes = require('./routes/admin');
const mealRoutes = require('./routes/meals');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');

// Database connection
const { connectDB } = require('./config/db');
connectDB();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.get("/", (req,res)=>{
  res.send("Welcome to the Food Order API!");
})
app.use("/admin/login", adminAuthRoutes);
app.use('/admin', adminRoutes);
app.use('/meals', mealRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);


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
