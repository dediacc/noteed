const jwt = require("jsonwebtoken")
const dotenv =  require("dotenv")
const config = require('../config/keys')
const JWT_SECRET = config.secretOrKey
dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;
console.log('jwt', JWT_SECRET)
module.exports =  (req, res, next) => {
//   const token = req.header("x-auth-token");
  const token = req.header('Authorization').split(" ")[1]

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorizaton denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    req.user = decoded;

    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};
