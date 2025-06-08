import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Acesso negado!" });
  }

  try {
    const decode = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    console.log("this is decode", decode);

    
    req.user = decode;

    next(); 
  } catch (error) {
    console.error("❌ Error verifying token:", error);
    return res.status(403).json({ error: "Token inválido!" });
  }
};

export default auth;
