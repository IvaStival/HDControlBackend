import jwt from "jsonwebtoken";

const JWT_SECRET = "123";

// generate token that expires in 24h
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "24h" });
};

export default generateToken;
