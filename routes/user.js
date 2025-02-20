const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router.get('/meals', async (req, res) => {
  try {
    const { name, email } = req.headers;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    // Find meals ordered by this user
    const userOrders = await Order.find({ "customer.name": name, "customer.email": email });

    if (!userOrders.length) {
      return res.status(404).json({ message: "No meals found for this user." });
    }

    // Extract ordered items from all orders
    const userMeals = userOrders.flatMap(order => order.items);

    res.json({ meals: userMeals });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
