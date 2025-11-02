import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization; // use let instead of const

    if (!token) {
      return res.status(401).json({ message: "Access denied, no token provided" });
    }

    // If using "Bearer <token>", split it
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user info to request
    // Temporary debug logging
    console.log("Auth decoded user:", decoded);
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ message: "Access denied, invalid or expired token" });
  }
};

const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. Unauthorized role." });
    }
    next();
  };
};

export {auth,requireRole};
