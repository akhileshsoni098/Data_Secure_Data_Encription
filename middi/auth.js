const jwt = require("jsonwebtoken");
const userAuthModel = require("../models/userDataModel");

exports.authentication = async function createContext(req) {
  let context = {};

  const token = req.headers["x-auth-token"];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user = await userAuthModel.findById(decoded._id);
    //   console.log(user);
      if (user) {
        context = {
          user: {
            _id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
          },
        };
      }
    } catch (err) {
      console.log("Token verification failed:", err.message);
    }
  }
  return context;
};
 