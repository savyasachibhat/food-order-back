const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();
const SECRET_KEY = "supersecretkey"; // Use environment variable in production

// Admin credentials
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = bcrypt.hashSync("admin1234", 10);

// Admin login route - generates JWT
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && bcrypt.compareSync(password, ADMIN_PASSWORD)) {
    const token = jwt.sign({ role: "admin" }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ message: "Admin login successful", token });
  } else {
    return res.status(401).json({ message: "Unauthorized access" });
  }
});

module.exports = router;
