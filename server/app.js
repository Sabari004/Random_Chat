const bodyParser = require("body-parser");
const Message = require("./models/Message");
const User = require("./models/User");
// "mongodb+srv://sabari_admin:17kLt1BkndwqUqqS@cluster0.ppsgpcf.mongodb.net/ReactPro?retryWrites=true&w=majority"
const express = require("express");
const mongoose = require("mongoose"); // new
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

require("dotenv/config");
// Connect to MongoDB database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("Connected to DB!")
);
app.get("/", async (req, res) => {
  try {
    const posts = await Message.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});
app.post("/", async (req, res) => {
  const post = new Message({
    message: req.body.message,
    username: req.body.username,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
app.get("/user", async (req, res) => {
  try {
    const posts = await User.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});
app.get("/user/:id", async (req, res) => {
  try {
    const posts = await User.find({ username: req.params.id });
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});
app.get("/user/:id/:pass", async (req, res) => {
  try {
    const posts = await User.find({
      username: req.params.id,
      password: req.params.pass,
    });
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});
app.post("/user", async (req, res) => {
  const post = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

app.listen(8080);
