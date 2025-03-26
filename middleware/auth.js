// const bcrypt = require('bcrypt');

// const ADMIN_EMAIL = 'admin@gmail.com';
// const ADMIN_PASSWORD = bcrypt.hashSync('admin1234', 10);

// const validateAdminCredentials = (req, res, next) => {
//   const { email, password } = req.headers;

//   if (email === ADMIN_EMAIL && bcrypt.compareSync(password, ADMIN_PASSWORD)) {
//     next();
//   } else {
//     res.status(401).json({ message: 'Invalid email or password' });
//   }
// };

// module.exports = { validateAdminCredentials };
// const jwt = require("jsonwebtoken");

// const SECRET_KEY = "supersecretkey"; 

// const validateAdminJWT = (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) {
    
//     return res.status(401).json({ message: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
//     if (decoded.role !== "admin") {
      
//       return res.status(403).json({ message: "Unauthorized access" });

//     }
//     next();
//   } catch (error) {
   
//     return res.status(400).json({ message: "Invalid token" });
//   }
// };

// module.exports = { validateAdminJWT };

const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "supersecretkey"; // Use .env in production

// ✅ Middleware to check if admin is authenticated
const validateAdminJWT = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({  message: "Access denied. No token provided."});
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized access"  });
        }
        req.user = decoded; // Store decoded user in request
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }
};

module.exports = { validateAdminJWT };
