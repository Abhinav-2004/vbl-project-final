const multer = require("multer");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { mongoose, models } = require("mongoose");
const User = require("./models/user.js");
const imageDownloader = require("image-downloader");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const bcryptSalt = bcrypt.genSaltSync(10);
require("dotenv").config();
const jwtSecret = "ahdjkhkiashdkjsa";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use("/uploads", express.static(__dirname + "/uploads"));
app.get("/test", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json("Test OK");
});

app.post("/register", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, email, password, department, designation, employeeID } =
    req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      department,
      designation,
      employeeID,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/profileSetting", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id, designation, employeeID, department } =
        await User.findById(userData.id);
      res.json({ name, email, _id, designation, employeeID, department });
      var myquery = { _id: _id };
      var newvalues = {
        $set: {
          name: req.body.name,
          designation: req.body.designation,
          department: req.body.department,
        },
      };
      User.updateMany(myquery, newvalues);
    });
  } else {
    res.json(null);
  }
});
app.post("/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    const approved = userDoc.status === "approved";
    if (passOk && approved) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id, designation, employeeID, department } =
        await User.findById(userData.id);
      res.json({ name, email, _id, designation, employeeID, department });
    });
  } else {
    res.json(null);
  }
});
app.post("/sales", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id, designation, employeeID, department } =
        await User.findById(userData.id);
      if (employeeID === req.body.employeeID) {
        res.status(200).json("success");
      }
      else{
        res.status(401).json("error 401")
      }
    });
  } else {
    res.status(400).json("error");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});
console.log({ __dirname });
app.post("/upload_by_link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.listen(4000);
