const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/mongo/User");

const { JWT_SECRET, JWT_SECRET_EXPIRY_TIME } = process.env;
console.log(JWT_SECRET, JWT_SECRET_EXPIRY_TIME);

function generateToken(id) {
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_SECRET_EXPIRY_TIME });

  return token;
}

exports.login = async function (req, res) {
  const { username, password } = req.body;
};

exports.signup = async function (req, res) {
  const { username, password } = req.body;

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
