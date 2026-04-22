const jwt = require("jsonwebtoken");
const User = require("../models/User");
const env = require("../config/env");
const ApiError = require("../utils/apiError");

const signToken = (user) =>
  jwt.sign(
    {
      userId: user._id,
      role: user.role
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn
    }
  );

const sanitizeUser = (user) => ({
  id: user._id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  phone: user.phone,
  targetExam: user.targetExam
});

const signup = async (req, res, next) => {
  try {
    const { fullName, email, password, role, phone, targetExam } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(409, "User already exists with this email");
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role,
      phone,
      targetExam
    });

    res.status(201).json({
      user: sanitizeUser(user),
      token: signToken(user)
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    res.json({
      user: sanitizeUser(user),
      token: signToken(user)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login
};
