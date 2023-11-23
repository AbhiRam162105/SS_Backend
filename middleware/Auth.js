import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

export const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "5d" }
  );
  return accessToken;
};

export const validateToken = (req, res, next) => {
  const accessToken = req.cookies["token"];
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
