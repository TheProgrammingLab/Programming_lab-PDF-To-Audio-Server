const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/mongo/User");

const { JWT_SECRET, JWT_SECRET_EXPIRY_TIME } = process.env;

function generateToken(id) {
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_SECRET_EXPIRY_TIME });

  return token;
}

exports.login = async function (req, res) {
  if (!req.body) {
    return res.status(400).json({ status: "fail", message: "Request body is required" });
  }

  const { username, password } = req.body;

  const user = await User.findOne({ username });

  console.log(user);

  const verifiedPassword = await bcrypt.compare(password, user.password);
  if (!verifiedPassword || !user) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid username or password",
    });
  }

  const token = generateToken(user._id.toString());

  res.status(200).json({
    status: "success",
    message: "login successful",
    data: {
      user,
    },
    token,
  });
};

exports.signup = async function (req, res) {
  if (!req.body) {
    return res.status(400).json({ status: "fail", message: "Request body is required" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Missing username or password",
    });
  }

  let user;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = await User.create({ username, password: hashedPassword });
    console.log(user);
  } catch (err) {
    console.log(err);
  }
  const token = generateToken(user._id.toString());

  res.status(201).json({
    status: "success",
    message: "Account created",
    data: {
      username,
    },
    token,
  });
};
